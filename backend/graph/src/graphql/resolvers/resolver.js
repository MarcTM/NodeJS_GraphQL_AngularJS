const { merge } = require('lodash');
const UserResolvers = require('../resolvers/users/user.resolver');


const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

const resolvers = merge(
  QueryResolvers,
  UserResolvers
);


module.exports = resolvers;