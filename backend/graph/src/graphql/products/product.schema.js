const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
    extend type Query {
        product(name: String!): Product!
        products: [Product]!
    }
    extend type Mutation{
        newProduct(name: String!, description: String!): Product!
    }
    type Product {
        id: ID!
        name: String!
        description: String
        user: User
    }
    input NewProduct{
        name: String!
        description: String!
    }
`;

module.exports = productTypeDefs;