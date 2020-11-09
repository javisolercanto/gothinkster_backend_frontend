var router = require('express').Router();
var auth = require('../auth');
const fetch = require('node-fetch');
const axios = require("axios")

/**
 * ===== FETCH =====
 * GET Movies by an author id. Get Author by rest and get movies by GRAPHQL
 */
router.get('/movie-by-author/:author', auth.optional, function (req, res, next) {
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
/**
 * ===== AXIOS =====
 * GET Movies by a serie slug. Get author by rest with serie.sluf and get movies by author by GRAPHQL
 */
router.get('/movie-by-serie/:serie', auth.optional, function (req, res, next) {
    axios({
        url: 'http://localhost:3000/api/series/find/' + req.params.serie,
        method: 'get',
    }).then((result) => {
        axios({
            url: 'http://localhost:3002/api/graphql/',
            method: 'post',
            data: {
                query: `
                query {
                    moviesByAuthor(author: "${result.data.serie.author._id}") {
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
                }`
            }
        }).then((result) => {
            return res.json({movies: result.data.data.moviesByAuthor});
        }).catch(next);
    });
});

module.exports = router;
