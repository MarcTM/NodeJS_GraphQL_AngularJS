const router = require('express').Router();
// const mongoose = require('mongoose');
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require('../../graphql/schemas');
const resolvers = require('../../graphql/resolvers');
// const User = mongoose.model('User');

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// const serverAuth = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: async ({ req }) => {
//         let user = null;
        
//         if (req.payload) {
//             user = await User.findById(req.payload.id);
//         }
        
//         return { user, AuthenticationError };
//     }
// })

server.applyMiddleware({ app: router, path:'/graphql' });
// serverAuth.applyMiddleware({ app: router, path:'/graphqlAuth' });

module.exports = router;