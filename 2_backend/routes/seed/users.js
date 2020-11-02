var router = require('express').Router();
var mongoose = require('mongoose');
var faker = require('faker');
var auth = require('../auth')
var utils = require('./userUtils');
var User = mongoose.model('User');
var Serie = mongoose.model('Serie');
var Review = mongoose.model('Review');

// Insert :qty users
router.get('/add/:qty', async function (req, res, next) {
    let users = [];
    try {
        // Iterate :qty times
        for (let i = 0; i < req.params.qty; i++) {
            var user = new User();

            // Generate random values
            user.username = faker.name.firstName() + faker.name.lastName();
            user.email = faker.internet.email();
            user.image = faker.internet.avatar();
            user.bio = faker.lorem.sentence();
            user.type = false;
            user.setPassword("12345678");

            // We check if the user is already stored with that email or username
            if ((await utils.CheckUnusedCredentials()).length == 0) {
                await user.save();
                users.push(user);
            }
        }

        return res.status(201).send({ users, "count": users.length });
    } catch (e) {
        next(e);
    }
});

router.delete('/:username', async function (req, res, next) {
    try {
        var user = await User.findOne({ username: req.params.username });

        if (!user) return res.status(404).send({ response: "User " + req.params.username + " not found" });

        let series = await Serie.find({ author: user });
        for (let i = 0; i < series.length; i++) {
            console.log("Removing reviews");
            await Review.remove({ serie: series[i] });
            console.log("Reviews removed");

            console.log("Removing series");
            await series[i].remove();
            console.log("Serie removed");
        }

        console.log("Removing user");
        await user.remove();
        console.log("User removed");

        return res.status(201);
    } catch (e) {
        next(e)
    }
});

router.get('/isAdmin', auth.required, async function (req, res, next) {
    try {
        let isAdmin = await utils.IsAdminUser(req.payload.id);
        return res.status(201).send({ "isAdmin": isAdmin });
    } catch (e) {
        next(e)
    }
});

module.exports = router;