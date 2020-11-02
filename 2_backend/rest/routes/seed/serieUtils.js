var mongoose = require('mongoose');
var Serie = mongoose.model('Serie');

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

exports.GenerateTags = async function () {
    let tags = await Serie.find().distinct('tagList');
    console.log(tags);
    return tags.filter((tag) => getRandom(0,2) == 1 && tag);
}

exports.GenerateCategory = async function () {
    let categories = await Serie.find().distinct('category');
    return categories[getRandom(0,categories.length -1)];
}

exports.SearchUserEmail = async function (email) {
    return await User.findOne(email);
}

exports.SearchUserUsername = async function (username) {
    return await User.findOne(username);
}

exports.CheckUnusedCredentials = async function (username, email) {
    console.log(await User.find({ $or: [{ email: email }, { username: username }]}));
    return await User.find({ $or: [{ email: email }, { username: username }] });
}