var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var CategorySchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
}, {timestamps: true});

CategorySchema.plugin(uniqueValidator, {message: 'is already registered'});

CategorySchema.pre('validate', function(next) {
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

CategorySchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

CategorySchema.methods.toJSONFor = function(){
  
  return {
    slug: this.slug,
    title: this.title,
  };
};

mongoose.model('Category', CategorySchema);
