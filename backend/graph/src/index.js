const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require('mongoose');
require('./models/User');
const typeDefs = require('./graphql/schemas/schema');
const resolvers = require('./graphql/resolvers/resolver');

const startServer = async () => {
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    
    server.applyMiddleware({ app });

    await mongoose.connect("mongodb://localhost:27017/conduit_nodejs", {
        useNewUrlParser: true
    });
    
    app.listen({ port: 3003}, () =>
        console.log(`Server ready at http://localhost:3003${server.graphqlPath}`)
    );
}

startServer();