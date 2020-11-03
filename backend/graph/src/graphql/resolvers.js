const { merge } = require('lodash');
const UserResolvers = require('./users/user.resolver');
const ProductResolvers = require('./products/product.resolver');

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
  UserResolvers,
  ProductResolvers
);


module.exports = resolvers;