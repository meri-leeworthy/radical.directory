import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    endSession
  }
`;

export const GET_USER_NAME = gql`
  query ($id: ID) {
    user(where: { id: $id }) {
      name
      id
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query ($id: ID) {
    user(where: { id: $id }) {
      name
      surname
      email
      bio
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String
    $email: String
    $surname: String
    $bio: String
  ) {
    updateUser(
      where: { email: $email }
      data: { name: $name, surname: $surname, bio: $bio }
    ) {
      name
      surname
      bio
      id
    }
  }
`;

export const AUTHENTICATED_USER = gql`
  query {
    authenticatedUser @client
  }
`;
