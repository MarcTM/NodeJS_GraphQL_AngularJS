const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const mongoose = require('mongoose');
require('./models/User');
require('./models/Product');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
    await mongoose.connect("mongodb://localhost:27017/conduit_nodejs", {
        useNewUrlParser: true
    });

    const app = express();

    app.use(require('./routes'));

    // const server = new ApolloServer({
    //     typeDefs,
    //     resolvers
    // })
    
    // server.applyMiddleware({ app });

   
    
    app.listen({ port: 3003}, () =>
        console.log(`Listening on port 3003`)
    );
}

startServer();