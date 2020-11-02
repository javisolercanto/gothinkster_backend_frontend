var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/series', require('./series'));

module.exports = router;
