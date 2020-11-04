import { ApolloServer, AuthenticationError } from "apollo-server-express"
import typeDefs from "../../graphql/schemas/schema";
import resolvers from "../../graphql/resolvers/resolver";
const mongoose = require('mongoose');
const User = mongoose.model('User');

const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});

const SERVERAUTH = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user = null;
        
        if (req.payload) {
            user = await User.findById(req.payload.id);
        } else {
            console.log("No user logged");
        }
        
        return { user, AuthenticationError };
    }
});

const SERVERS = {
    graphql: SERVER,
    graphqlauth: SERVERAUTH
};

export default SERVERS;