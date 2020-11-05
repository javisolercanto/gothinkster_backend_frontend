const mongoose = require('mongoose');
const User = mongoose.model('User');

const resolvers = {
    Query: {
      user: (root, {username}) => {
        return User.findOne({username: username}).exec();
      },
      users: async () => {
        return await User.find().exec();
      },
    },
};

export default resolvers;