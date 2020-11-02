var mongoose = require('mongoose');
var User = mongoose.model('User');

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

exports.IsAdminUser = async function (id) {
    let user = await User.findById(id);
    return user.isAdmin();
}

exports.SearchUserEmail = async function (email) {
    return await User.findOne(email);
}

exports.SearchUserUsername = async function (username) {
    return await User.findOne(username);
}

exports.GetRandomUser = async function () {
    let usersCount = await User.count().exec();
    return await User.findOne().skip(getRandom(0, usersCount)).exec();
}

exports.CheckUnusedCredentials = async function (username, email) {
    console.log(await User.find({ $or: [{ email: email }, { username: username }]}));
    return await User.find({ $or: [{ email: email }, { username: username }] });
}