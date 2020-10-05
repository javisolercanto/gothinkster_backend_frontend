var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var SerieSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  seasons: Number,
  image: String,
  category: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  favoritesCount: {type: Number, default: 0},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {timestamps: true});

SerieSchema.plugin(uniqueValidator, {message: 'is already registered'});

SerieSchema.pre('validate', function(next) {
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

SerieSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

SerieSchema.methods.updateFavoriteCount = function() {
  var serie = this;

  return User.count({favorites: {$in: [serie._id]}}).then(function(count){
    serie.favoritesCount = count;

    return serie.save();
  });
};

SerieSchema.methods.toJSONFor = function(user, category){
  
  return {
    slug: this.slug,
    title: this.title,
    seasons: this.seasons,
    image: this.image,
    category: this.category,
    /* category: this.category.toProfileJSONFor(category), */
    author: this.author.toProfileJSONFor(user),
    favorited: user ? user.isFavorite(this._id) : false,
    favoritesCount: this.favoritesCount,
  };
};

mongoose.model('Serie', SerieSchema);
