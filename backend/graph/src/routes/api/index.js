const router = require('express').Router();
const cors = require('cors');

const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const mongoose = require('mongoose');
const User = mongoose.model('User');

const typeDefs = require('../../graphql/schemas');
const resolvers = require('../../graphql/resolvers');



const server = new ApolloServer({
    typeDefs,
    resolvers
})

const serverAuth = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user = null;
        
        if (req.payload) {
            user = await User.findById(req.payload.id);
        }
        
        return { user, AuthenticationError };
    }
})

router.use(cors());
router.use('/graphqlauth', require('../auth').required);
server.applyMiddleware({ app: router, path:'/graphql' });
serverAuth.applyMiddleware({ app: router, path:'/graphqlauth'});


module.exports = router;