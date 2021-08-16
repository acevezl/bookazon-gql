import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        authors
        title      
        description
        image
        link
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user {
    user {
      _id
      username
      email
      savedBooks {
        _id
        bookId
        authors
        title      
        description
        image
        link
      }
    }
  }
`;
