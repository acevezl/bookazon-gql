# MERN app with Google API
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Refactpred a functioning Google books API search engine built with RESTful API into GraphQL API with Apollo Server. 

See the app live here: https://dramasearch.herokuapp.com/
(As of 8/15 There is a general Heroku error due to version incompatibility between GraphQL in my repo Vs. Heroku - unable to solve)

## Table of Contents
- [MERN app with Google API](#mern-app-with-google-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Code](#code)
    - [GraphQL Updates](#graphql-updates)
      - [Created Schemas](#created-schemas)
        - [typeDefs](#typedefs)

## Installation

In order to run this app locally, please do a git pull or clone from here: 
https://github.com/acevezl/bookazon-gql

Once downloaded run the following command on the root directory:

```
npm install
```
This command will install the necessary components for the app based on the root package file:

```
{
  "name": "googlebooks-app",
  "version": "1.0.0",
  "description": "",
  "main": "server/server.js",
  "scripts": {
    "start": "cd server && npm start",
    "start:prod": "cd server && npm start",
    "start:dev": "concurrently \"cd server && npm run watch\" \"cd client && npm start\"",
    "develop": "concurrently \"cd server && npm run watch\" \"cd client && npm start\"",
    "install": "cd server && npm i && cd ../client && npm i",
    "build": "cd client && npm run build",
    "heroku-postbuild": "cd client && npm run build"
  },
  "keywords": [],
  "author": "Luis Arnaut",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^5.1.0"
  },
  "dependencies": {
    "@apollo/react-hooks": "^4.0.0",
    "if-env": "^1.0.4"
  }
}
```


## Code

### GraphQL Updates
The following updates have been performed:

#### Created Schemas
Under `/server` created a folder called `/server/schemas` and added the type definitions and resolvers files:

##### typeDefs
* User: To define the user document, which will hold user information along with saved books.

```
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [bookSchema]
  }
```

* Auth: Used for token and authentication

```
type Auth {
    token: ID!
    user: User
  }
```

* Queries: These define two main queries: (me) to retrieve the logged user data, and (user) to retrieve any user data (the latter is not used in this codebase and can be removed)
  
```
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
