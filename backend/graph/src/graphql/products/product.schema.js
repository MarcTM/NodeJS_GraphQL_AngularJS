const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
    extend type Query {
        product(name: String!): Product!
        products: [Product]!
    }
    extend type Mutation{
        newProduct(input: NewProduct): Product
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
        user: String!
    }
`;

module.exports = productTypeDefs;