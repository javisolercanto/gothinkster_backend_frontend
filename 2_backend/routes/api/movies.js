var router = require('express').Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var User = mongoose.model('User');
var auth = require('../auth');

// Preload movie objects on routes with ':movie'
router.param('movie', function(req, res, next, slug) {
  Movie.findOne({ slug: slug})
    .populate('author')
    .then(function (movie) {
      if (!movie) { return res.sendStatus(404); }

      req.movie = movie;

      return next();
    }).catch(next);
});

// Save register
router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var movie = new Movie(req.body.movie);

    movie.author = user;

    return movie.save().then(function(){
      return res.json({movie: movie.toJSONFor(user)});
    });
  }).catch(next);
});

// Find all
router.get('/', auth.optional, function(req, res, next) {
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favorites};
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Movie.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Movie.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var movies = results[0];
      var moviesCount = results[1];
      var user = results[2];

      return res.json({
        movies: movies.map(function(movie){
          return movie.toJSONFor(user);
        }),
        moviesCount: moviesCount
      });
    });
  }).catch(next);
});

// return a movie
router.get('/:movie', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.movie.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({movie: req.movie.toJSONFor(user)});
  }).catch(next);
});

// update movie
router.put('/:movie', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.movie.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.movie.title !== 'undefined'){
        req.movie.title = req.body.movie.title;
      }

      if(typeof req.body.movie.description !== 'undefined'){
        req.movie.description = req.body.movie.description;
      }

      if(typeof req.body.movie.body !== 'undefined'){
        req.movie.body = req.body.movie.body;
      }

      if(typeof req.body.movie.tagList !== 'undefined'){
        req.movie.tagList = req.body.movie.tagList
      }

      req.movie.save().then(function(movie){
        return res.json({movie: movie.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete movie
router.delete('/:movie', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    console.log("************" + req.movie.author._id);

    if(req.movie.author._id.toString() === req.payload.id.toString()){
      return req.movie.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});

// Favorite an movie
router.post('/:movie/favorite', auth.required, function(req, res, next) {
  var movieId = req.movie._id;
  
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favorite(movieId).then(function(){
      return req.movie.updateFavoriteCount().then(function(movie){
        return res.json({movie: movie.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// Unfavorite an movie
router.delete('/:movie/favorite', auth.required, function(req, res, next) {
  var movieId = req.movie._id;

  User.findById(req.payload.id).then(function (user){
    if (!user) { return res.sendStatus(401); }

    return user.unfavorite(movieId).then(function(){
      return req.movie.updateFavoriteCount().then(function(movie){
        return res.json({movie: movie.toJSONFor(user)});
      });
    });
  }).catch(next);
});

module.exports = router;
