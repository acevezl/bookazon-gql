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
        title
        authors
        description
        image
        link
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
