import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    createUser(name: $name, email: $email, password: $password, role: $role)
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($id: String!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: String!, $name: String!) {
    updateUser(id: $id, name: $name)
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost($id: String!, $body: String!) {
    updatePost(id: $id, body: $body)
  }
`;
