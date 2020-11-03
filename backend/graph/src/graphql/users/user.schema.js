const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    extend type Query {
        user(username: String!): User!
        users: [User]!
    }
    extend type Mutation{
        login(email: String!, password: String!): User!
    }
    type User {
        id: ID!
        idsocial: String
        username: String
        type: String
        email: String
        image: String
        bio: String
        salt: String
    }
`;

module.exports = userTypeDefs;