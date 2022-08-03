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

export const GET_POST_SLUGS = gql`
  query GetPosts {
    posts {
      slug
    }
  }
`;

export const GET_POST = gql`
  query GetPost($slug: String) {
    post(where: { slug: $slug }) {
      title
      document
      slug
      content {
        document(hydrateRelationships: true)
      }
    }
  }
`;

export const GET_USER_NAME = gql`
  query GetUserName($id: ID) {
    user(where: { id: $id }) {
      name
      id
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID) {
    user(where: { id: $id }) {
      name
      surname
      email
      bio
      id
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($id: ID!) {
    user(where: { id: $id }) {
      posts {
        id
        slug
        title
        snippet
        authorString
        publishDate
      }
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
      email
      bio
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($document: JSON, $slug: String!, $title: String!) {
    updatePost(
      where: { slug: $slug }
      data: { document: $document, title: $title, slug: $slug }
    ) {
      title
      document
      slug
    }
  }
`;

export const AUTHENTICATED_USER = gql`
  query AuthenticatedUserLocal {
    authenticatedUser @client
  }
`;
