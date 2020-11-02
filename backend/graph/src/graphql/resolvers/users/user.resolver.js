const mongoose = require('mongoose');
const User = mongoose.model('User');

const UserResolvers = {
    Query: {
      user: (_, {username}) => {
        return User.findOne({username: username}).exec();
      },
      users: () => {
        return User.find().exec();
      },
    }
};

module.exports = UserResolvers;