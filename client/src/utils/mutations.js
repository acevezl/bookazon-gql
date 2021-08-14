import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($bookId: String!, $title: String!, $authors:[String]!, $description: String!, $image: String!, $link: String!) {
    addBook(bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $image) {
        bookId
        title
        authors
        description
        image
        link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(_id: $id) {
      _id
      bookId
      title
      authors
      description
      image
      link
    }
  }
`;
