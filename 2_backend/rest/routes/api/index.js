var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/movies', require('./movies'));
router.use('/series', require('./series'));
router.use('/articles', require('./articles'));
router.use('/categories', require('./categories'));
router.use('/tags', require('./tags'));
router.use('/request', require('./request'));


router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;