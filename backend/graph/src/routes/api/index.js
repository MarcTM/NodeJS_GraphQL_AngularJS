var router = require('express').Router();
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require('../../graphql/schemas');
const resolvers = require('../../graphql/resolvers');


const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app: router, path:'/graphql' });

module.exports = router;