var router = require('express').Router();
var mongoose = require('mongoose');
var Category = mongoose.model('Category');
var auth = require('../auth');

// Preload category objects on routes with ':category'
router.param('category', function (req, res, next, slug) {
  Category.findOne({ slug: slug })
    .then(function (category) {
      if (!category) { return res.sendStatus(404); }

      req.category = category;

      return next();
    }).catch(next);
});

// Save register
router.post('/', auth.required, function (req, res, next) {
  var category = new Category(req.body.category);

  category.author = user;

  return category.save().then(function () {
    return res.json({ category: category.toJSONFor() });
  });
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
    Category.find(query)
      .limit(Number(limit))
      .skip(Number(offset))
      .sort({ createdAt: 'desc' })
      .exec(),
    Category.count(query).exec()
  ]).then(function (results) {
    var categories = results[0];
    var categoriesCount = results[1];

    return res.json({
      categories: categories.map(function (category) {
        return category.toJSONFor();
      }),
      categoriesCount: categoriesCount
    });
  }).catch(next);
});

// return a category
router.get('/:category', auth.optional, function (req, res, next) {
  Category.findById()
  
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.category.populate('author').execPopulate()
  ]).then(function (results) {
    var user = results[0];

    return res.json({ category: req.category.toJSONFor() });
  }).catch(next);
});

// update category
router.put('/:category', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (req.category.author._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.category.title !== 'undefined') {
        req.category.title = req.body.category.title;
      }

      if (typeof req.body.category.seasons !== 'undefined') {
        req.category.seasons = req.body.category.seasons;
      }

      if (typeof req.body.category.image !== 'undefined') {
        req.category.image = req.body.category.image;
      }

      req.category.save().then(function (category) {
        return res.json({ category: category.toJSONFor(user) });
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete category
router.delete('/:category', auth.required, function (req, res, next) {
  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    if (req.category.author._id.toString() === req.payload.id.toString()) {
      return req.category.remove().then(function () {
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an category
router.post('/:category/favorite', auth.required, function (req, res, next) {
  var categoryId = req.category._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.favorite(categoryId).then(function () {
      return req.category.updateFavoriteCount().then(function (category) {
        return res.json({ category: category.toJSONFor(user) });
      });
    });
  }).catch(next);
});

// Unfavorite an category
router.delete('/:category/favorite', auth.required, function (req, res, next) {
  var categoryId = req.category._id;

  User.findById(req.payload.id).then(function (user) {
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(categoryId).then(function () {
      return req.category.updateFavoriteCount().then(function (category) {
        return res.json({ category: category.toJSONFor(user) });
      });
    });
  }).catch(next);
});

module.exports = router;
