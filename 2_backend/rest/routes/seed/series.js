var router = require('express').Router();
var mongoose = require('mongoose');
var faker = require('faker');
var serieUtils = require('./serieUtils');
var userUtils = require('./userUtils');
var fetch = require('node-fetch');
var Serie = mongoose.model('Serie');
var Review = mongoose.model('Review');

// Insert :qty series
router.get('/add/:qty', async function (req, res, next) {
    let series = [];
    try {
        // Iterate :qty times
        for (let i = 0; i < req.params.qty; i++) {
            var serie = new Serie();

            // Generate random values
            serie.title = faker.name.title();
            serie.seasons = faker.random.number({ 'min': 1, 'max': 99 });
            serie.category = await serieUtils.GenerateCategory();
            serie.tagList = await serieUtils.GenerateTags();
            serie.image = faker.image.imageUrl();

            // We take a random user 
            serie.author = await userUtils.GetRandomUser();

            // Check if there's no user inside database
            if (serie.author) {
                await serie.save();
                series.push(serie);
            } else {
                fetch('http://localhost:3000/seed/users/add/1')
                    .then(function(response) {
                        if (response.users.length > 0) serie.author = response.users[0] ;
                    })
            }
        }

        return res.status(201).send({ series, "count": series.length });
    } catch (e) {
        next(e);
    }
});

router.delete('/:slug', async function (req, res, next) {
    try {
        var serie = await Serie.findOne({ slug: req.params.slug });

        if (!serie) return res.status(404).send({ response: "Serie not found" })

        console.log("Removing Reviews");
        await Review.remove({ serie: serie });
        onsole.log("Reviews removed");
        
        console.log("Removing series");
        await serie.remove();
        console.log("Serie removed");

        return res.status(201).send({ "serie": serie.title });
    } catch (e) {
        next(e)
    }
});

module.exports = router;