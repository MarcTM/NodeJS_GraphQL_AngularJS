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
    },
    Mutation: {
      login: (_, {email, password}) => {
            let user = User.findOne({email: email});
            return user;
      }
  }
};

module.exports = UserResolvers;