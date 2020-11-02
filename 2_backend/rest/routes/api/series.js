var router = require('express').Router();
var mongoose = require('mongoose');
var Serie = mongoose.model('Serie');
var User = mongoose.model('User');
var Review = mongoose.model('Review');
var auth = require('../auth');

// Preload serie objects on routes with ':serie'
router.param('serie', function (req, res, next, slug) {
  Serie.findOne({ slug: slug })
    .populate('author')
    .then(function (serie) {
      if (!serie) { return res.sendStatus(404); }

      req.serie = serie;

      return next();
    }).catch(next);
});

router.param('review', function (req, res, next, id) {
  Review.findById(id).then(function (review) {
    if (!review) { return res.sendStatus(404); }

    req.review = review;

    return next();
  }).catch(next);
});

// Save a serie
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var serie = new Serie(req.body.serie);
    serie.author = user;

    serie.image === '' && (serie.image = "https://oij.org/wp-content/uploads/2016/05/placeholder.png");

    return serie.save().then(function () {
      return res.json({ serie: serie.toJSONFor(user) });
    });

  }).catch(next);
});

// Find all
router.get('/', auth.optional, function (req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  if (typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  if (typeof req.query.category !== 'undefined' ){
    query.category = {"$in" : [req.query.category]};
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
    req.query.favorited ? User.findOne({ username: req.query.favorited }) : null
  ]).then(function (results) {
    var author = results[0];
    var favoriter = results[1];

    if (author) {
      query.author = author._id;
    }

    if (favoriter) {
      query._id = { $in: favoriter.favorites };
    } else if (req.query.favorited) {
      query._id = { $in: [] };
    }

    return Promise.all([
      Serie.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: 'desc' })
        .populate('author')
        .exec(),
      Serie.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function (results) {
      var series = results[0];
      var seriesCount = results[1];
      var user = results[2];

      return res.json({
        series: series.map(function (serie) {
          return serie.toJSONFor(user);
        }),
        seriesCount: seriesCount
      });
    });
  }).catch(next);
});

// Return all distinct categories
router.get('/categories', auth.optional, function (req, res, next) {
  Serie.find().distinct('category').then(function (categories) {
    return res.json({ categories: categories });
  });
});

// Return feed
router.get('/feed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Serie.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Serie.count({ author: {$in: user.following}})
    ]).then(function(results){
      var series = results[0];
      var seriesCount = results[1];

      return res.json({
        series: series.map(function(serie){
          return serie.toJSONFor(user);
        }),
        seriesCount: seriesCount
      });
    }).catch(next);
  });
});

// Get a serie
router.get('/:serie', auth.optional, function (req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.serie.populate('author').execPopulate()
  ]).then(function (results) {
    var user = results[0];

    return res.json({ serie: req.serie.toJSONFor(user) });
  }).catch(next);
});

// Update a serie
router.put('/:serie', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.serie.author._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.serie.title !== 'undefined') {
        req.serie.title = req.body.serie.title;
      }

      if (typeof req.body.serie.seasons !== 'undefined') {
        req.serie.seasons = req.body.serie.seasons;
      }

      if (typeof req.body.serie.image !== 'undefined') {
        req.serie.image = req.body.serie.image;
      } 

      req.serie.image === '' && (req.serie.image = "https://oij.org/wp-content/uploads/2016/05/placeholder.png");

      if (typeof req.body.serie.category !== 'undefined') {
        req.serie.category = req.body.serie.category;
      }

      if (typeof req.body.serie.category !== 'undefined') {
        req.serie.category = req.body.serie.category;
      }

      if(typeof req.body.serie.tagList !== 'undefined'){
        req.serie.tagList = req.body.serie.tagList
      }

      req.serie.save().then(function (serie) {
        return res.json({ serie: serie.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// Delete a serie
router.delete('/:serie', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.serie.author._id.toString() === req.payload.id.toString()) {
      return req.serie.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an serie
router.post('/:serie/favorite', auth.required, async function (req, res, next) {
  var serieId = req.serie._id;

  try {
    let user = await User.findById(req.payload.id);

    if (!user) return res.status(404).send({response: "user error"});

    await user.favorite(serieId);
    await req.serie.updateFavoriteCount();
    await user.updateKarma(true, 40);

    return res.json({ serie: req.serie.toJSONFor(user) });

  } catch (e) {
    next(e);
  }
});

// Unfavorite an serie
router.delete('/:serie/favorite', auth.required, async function (req, res, next) {
  var serieId = req.serie._id;

  try {
    let user = await User.findById(req.payload.id);

    if (!user) return res.status(404).send({response: "user error"});

    await user.unfavorite(serieId);
    await req.serie.updateFavoriteCount();
    await user.updateKarma(false, 40);

    return res.json({ serie: req.serie.toJSONFor(user) });

  } catch (e) {
    next(e);
  }
});

// Get reviews of a serie
router.get('/:serie/reviews', auth.optional, function (req, res, next) {
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function (user) {
    return req.serie.populate({
      path: 'reviews',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function (serie) {
      return res.json({
        reviews: req.serie.reviews.map(function (review) {
          return review.toJSONFor(user);
        })
      });
    });
  }).catch(next);
});

// Create a review
router.post('/:serie/reviews', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    var review = new Review(req.body.review);
    review.serie = req.serie;
    review.author = user;

    return review.save().then(async function () {
      req.serie.reviews === undefined ? req.serie.reviews = [] : req.serie.reviews = req.serie.reviews.concat(review);
      
      await user.updateKarma(true, 40);

      return req.serie.save().then(function (serie) {
        res.json({ review: review.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// Delete a review
router.delete('/:serie/reviews/:review', auth.required, async function (req, res, next) {
  if (req.review.author.toString() === req.payload.id.toString()) {
    req.serie.reviews.remove(req.review._id);
    let user = await User.findById(req.review.author);
    await user.updateKarma(false, 40);
    req.serie.save()
      .then(Review.find({ _id: req.review._id }).remove().exec())
      .then(function () {
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
