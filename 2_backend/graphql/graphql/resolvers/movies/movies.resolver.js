const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

const resolvers = {
    Query: {
        movie: (root, {slug}) => {
            return Movie.findOne({slug: slug}).exec();
        },
        movies: async () => {
            return await Movie.find().exec();
        }
    }
};

export default resolvers;