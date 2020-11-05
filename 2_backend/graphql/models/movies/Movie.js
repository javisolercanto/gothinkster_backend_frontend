var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var MovieSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  title: String,
  director: String,
  duration: Number,
  releaseYear: Number,
  favoritesCount: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

MovieSchema.plugin(uniqueValidator, { message: 'is already registered' });

MovieSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

MovieSchema.methods.slugify = function () {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

MovieSchema.methods.toJSONFor = function (user) {

  return {
    slug: this.slug,
    title: this.title,
    director: this.director,
    duration: this.duration,
    releaseYear: this.releaseYear,
  };
};

mongoose.model('Movie', MovieSchema);
