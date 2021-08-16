const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookSchema]
  }

  type bookSchema {
    _id: ID
    bookId: String
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User,
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(bookId: String!, title:String!, authors: [String]!, description: String, image: String, link: String): User,
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
