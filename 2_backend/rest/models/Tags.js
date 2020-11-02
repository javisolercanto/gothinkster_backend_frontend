var router = require('express').Router();
var mongoose = require('mongoose');
var Serie = mongoose.model('Serie');

router.get('/', function(req, res, next) {
    Serie.find().distinct('tagList').then(function(tags) {
        return res.json({tags: tags});
    }).catch(next);
});

module.exports = router;