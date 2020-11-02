
var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  body: String,
  likes: {type: Number, default: 0},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  serie: { type: mongoose.Schema.Types.ObjectId, ref: 'Serie' }
}, {timestamps: true});

// Requires population of author
ReviewSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    likes: this.likes,
    author: this.author.toProfileJSONFor(user)
  };
};

ReviewSchema.methods.updateFavoriteCount = function() {
  var review = this;

  return User.count({likes: {$in: [review._id]}}).then(function(count){
    review.favoritesCount = count;

    return review.save();
  });
};

mongoose.model('Review', ReviewSchema);
