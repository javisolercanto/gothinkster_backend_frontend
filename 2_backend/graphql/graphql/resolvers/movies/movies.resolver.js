const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const User = mongoose.model('User');

const resolvers = {
    Query: {
        movie: (root, { slug }) => {
            return Movie.findOne({ slug: slug }).exec();
        },
        movies: async () => {
            return Movie.find().exec();
        }

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