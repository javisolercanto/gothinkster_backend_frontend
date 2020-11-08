const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const User = mongoose.model('User');

const resolvers = {
    Query: {
        movie: (root, { slug }) => {
            return Movie.findOne({ slug: slug }).exec();
        },
        moviesByAuthor: async (root, { author }) => {
            return await Movie.find({ author: author }).populate('author').exec();;
        },
        movies: async () => {
            return Movie.find().exec();
        },
        moviesConfig: async (root, { limit, offset, type, userid }) => {
            if (type === 'feed') {
                let current = await User.findById(userid).populate('following');
                let movies = await Movie.find().populate('author').exec();
                let m = [];
                movies.map((movie) => current.following.map((user) => user.username === movie.author.username && m.push(movie)));
                return m.splice(offset, limit)
            } else {
                return Movie.find().skip(offset).limit(limit).exec();
            }
        },
        moviesCount: () => {
            return Movie.count().exec();
        },

    },
    Mutation: {
        createMovie: (root, { input }) => {
            let movie = new Movie(input);
            movie.save();
            return movie;
        }
    },
    Movie: {
        author: async (parent) => {
            return await (await User.findById(parent.author)
                .populate({
                    path: 'following',
                    populate: {
                        path: 'following',
                        model: 'User'
                    }
                }).exec());
        }
    }
};

export default resolvers;