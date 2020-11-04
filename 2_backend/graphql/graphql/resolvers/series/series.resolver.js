const mongoose = require('mongoose');
const Serie = mongoose.model('Serie');

const resolvers = {
    Query: {
        serie: (root, {slug}) => {
            return Serie.findOne({slug: slug}).exec();
        },
        series: async () => {
            return await Serie.find().exec();
        }
    }
};

export default resolvers;