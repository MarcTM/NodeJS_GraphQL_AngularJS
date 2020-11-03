const { gql } = require('apollo-server-express');
const userTypeDefs = require('./users/user.schema');
const productTypeDefs = require('./products/product.schema');

const Query = gql`
    type Query {
        message: String
        authenticationError: String
    }
    type Mutation {
        _empty: String
    }
`;

const typeDefs = [
    Query,
    userTypeDefs,
    productTypeDefs
];

module.exports = typeDefs;
