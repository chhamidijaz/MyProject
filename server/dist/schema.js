"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { gql } = require("apollo-server");
const typeDefs = gql `
  type User {
    id: String!
    name: String!
    email: String!
    role: String!
    posts: [Post!]!
  }
  type Post {
    id: String!
    body: String!
    user: User!
  }
  type Query {
    user: User!
    anyUser(id: String!): User!
    users(limit: Int!, offset: Int!, searchQuery: String): [User]
    posts(limit: Int!, offset: Int!): [Post]!
    post(id: String!): Post!
    userPosts: [Post]!
    searchUser(name: String!): [User]!
    anyUserPosts(id: String!): [Post]!
  }
  type LoginPayload {
    token: String
  }
  type Mutation {
    createUser(
      name: String!
      password: String!
      email: String!
      role: String!
    ): String!
    login(email: String!, password: String!): LoginPayload!
    updateUser(id: String, name: String, email: String, role: String): String!
    deleteUser(id: String): String!
    updatePost(id: String, body: String): String!
    deletePost(id: String): String!
    createPost(body: String!): Post!
  }
`;
module.exports = typeDefs;
