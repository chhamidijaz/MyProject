"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const models = require("./models");
const jwt = require("jsonwebtoken");
const getUser = (token) => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, "qqqqqqqqqqqqqqqqqqqqqq");
        }
        catch (err) {
            // if there's a problem with the token, throw an error
            throw new apollo_server_1.AuthenticationError("In valid Token | session expired");
        }
    }
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        var _a;
        const token = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        let user = null;
        if (token) {
            user = getUser(token);
        }
        return { models, user };
    },
});
server.listen().then(({}) => {
    console.log("Server is running on http://localhost:4000");
});
