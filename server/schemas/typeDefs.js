// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    
    type Book {
        _id: ID
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type User {
        _id: ID
        username: String
        email: String,
        password: String,
        savedBooks: [Book]
    }

    type Query {
        me: User,
        book: Book
    }

    type Mutation {
        login(email: String!, password: String!):Auth
        addUser(username: String!, email: String!, password: String!):Auth
        addBook(authors: [String]!, description: String!, bookId: String!, image: String, link: String!, title: String!):Book
        deleteBook(bookId: [String]!):Book
    }

    type Auth {
        token: ID,
        user: User
    }

`;

module.exports = typeDefs;