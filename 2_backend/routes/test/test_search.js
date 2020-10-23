var router = require('express').Router();
var mongoose = require('mongoose');
var utils = require('./utils');

router.get('/test/:email', async function(req, res) {
    var user = await utils.SearchUser(req.params);
    return user ? res.json({ user : user.toAuthJSON() }) :  res.status(422).json('error');
}); 

module.exports = router;