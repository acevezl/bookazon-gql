// import React, { useState, useEffect } from 'react';
import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

//import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';



const SavedBooks = () => {

  const loggedIn = Auth.loggedIn();

  const { loading, data:userData } = useQuery(QUERY_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);
  //const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  // const userDataLength = Object.keys(userData).length;
 
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    // try {
    //   const response = await deleteBook(bookId, token);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const updatedUser = await response.json();
    //   setUserData(updatedUser);
    //   // upon success, remove book's id from localStorage
    //   removeBookId(bookId);
    // } catch (err) {
    //   console.error(err);
    // }

    try {
      await removeBook({
        variables: { bookId }
      });
      removeBookId(bookId);
    } catch (e) {
      console.error(e);
    }
  };

  // // if data isn't here yet, say so
  // if (!userData) {
  //   return <h2>LOADING...</h2>;
  // }

  if (!loggedIn) {
    return <Redirect to="/"/>;
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  } else {
    let savedBooksCount = userData.me.savedBooks.length;
    let savedBooks = userData.me.savedBooks;
    return (
      <>
        <Jumbotron fluid className='text-light bg-dark'>
          <Container>
            <h1>Viewing saved books!</h1>
            {loading && <h2>LOADING...</h2>}
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {savedBooksCount
              ? `Viewing ${savedBooksCount} saved ${savedBooksCount === 1 ? 'book' : 'books'}:`
              : 'You have no saved books!'}
          </h2>
          <CardColumns>
            {savedBooks.map((book) => {
              if (book) {
                return (
                  <Card key={book.bookId} border='dark'>
                    {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <p className='small'>Authors: {book.authors}</p>
                      <Card.Text>{book.description}</Card.Text>
                      <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                        Delete this Book!
                      </Button>
                      <p className='small mt-1'><a className='btn btn-block btn-secondary' target="_blank" rel="noopener noreferrer" href={book.link}>See on Play Store</a></p>
                    </Card.Body>
                  </Card>
                );
              }
              return false;
            })}
          </CardColumns>
        </Container>
      </>
    );
  }
};

export default SavedBooks;
