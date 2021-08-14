import gql from 'graphql-tag';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            password
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($email: String!) {
        user(email: $email) {
            _id
            username
            email
            savedBooks{
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;

export const QUERY_BOOK = gql`
    query book($id: ID!) {
        book(_id: $id) {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;

export const QUERY_BOOKS = gql`
    query books($email: String){
        books(email: $email) {
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
`;