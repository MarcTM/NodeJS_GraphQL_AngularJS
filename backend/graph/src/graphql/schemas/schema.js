const { gql } = require('apollo-server-express');
const userTypeDefs = require('../schemas/users/user.schema')

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
    userTypeDefs
];

module.exports = typeDefs;
