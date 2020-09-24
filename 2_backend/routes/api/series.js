var router = require('express').Router();
var mongoose = require('mongoose');
var Serie = mongoose.model('Serie');
var User = mongoose.model('User');
var Category = mongoose.model('Category');
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

// Save register
router.post('/', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    Category.findById("").then(function (category) {
      if (!category) { return res.sendStatus(401); }

      var serie = new Serie(req.body.serie);

      serie.author = user;
      serie.category = category;

      return serie.save().then(function () {
        return res.json({ serie: serie.toJSONFor(user, category) });
      });
    })
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

// return a serie
router.get('/:serie', auth.optional, function (req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.serie.populate('author').execPopulate()
  ]).then(function (results) {
    var user = results[0];

    return res.json({ serie: req.serie.toJSONFor(user) });
  }).catch(next);
});

// update serie
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

      req.serie.save().then(function (serie) {
        return res.json({ serie: serie.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete serie
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
router.post('/:serie/favorite', auth.required, function (req, res, next) {
  var serieId = req.serie._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.favorite(serieId).then(function () {
      return req.serie.updateFavoriteCount().then(function (serie) {
        return res.json({ serie: serie.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// Unfavorite an serie
router.delete('/:serie/favorite', auth.required, function (req, res, next) {
  var serieId = req.serie._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(serieId).then(function () {
      return req.serie.updateFavoriteCount().then(function (serie) {
        return res.json({ serie: serie.toJSONFor(user) });
      });
    });
  }).catch(next);
});

module.exports = router;
