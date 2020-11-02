var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.SearchUser = async function (email) {
    return await User.findOne(email);
}