import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query users($limit: Int!, $offset: Int!) {
    users(limit: $limit, offset: $offset) {
      id
      name
      email
      role
    }
  }
`;

export const LOAD_USER = gql`
  query {
    user {
      name
      role
      email
    }
  }
`;

export const LOAD_POSTS = gql`
  query posts($limit: Int!, $offset: Int!) {
    posts(limit: $limit, offset: $offset) {
      id
      body
      user {
        id
        name
      }
    }
  }
`;

export const LOAD_User_POSTS = gql`
  query {
    userPosts {
      id
      body
      user {
        name
      }
    }
  }
`;

export const LOAD_ANY_User_POSTS = gql`
  query anyUserPosts($id: String!) {
    anyUserPosts(id: $id) {
      body
      user {
        name
      }
    }
  }
`;

export const LOAD_POST = gql`
  query post($id: String!) {
    post(id: $id) {
      id
      body
      user {
        id
        name
      }
    }
  }
`;

export const LOAD_ANY_USER = gql`
  query anyUser($id: String!) {
    anyUser(id: $id) {
      name
      email
      role
    }
  }
`;
