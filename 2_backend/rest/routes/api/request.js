var router = require('express').Router();
var auth = require('../auth');
var fetch = require('node-fetch');

router.get('/common/:author', auth.optional, function (req, res, next) {
    fetch('http://localhost:3000/api/user/find/' + req.params.author)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let query = `
            query {
                moviesByAuthor(author: "${data.user.id}") {
                    id
                    slug
                    title
                    releaseYear
                    director
                    duration
                    favoritesCount
                    author {
                        username
                        image
                        email
                        bio
                    }
                }
            }`;
            fetch('http://localhost:3002/api/graphql/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query
                })
            })
                .then(r => r.json())
                .then(movies => { return res.json({ movies: movies }) });
        })
        .catch(function (err) {
            console.error(err);
        });
});

module.exports = router;
