import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route, Switch } from "react-router-dom";
import Category from "./Category";
import SearchButton from "./SearchButton";
import Search from "./Search";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  addBook = (id, title, shelf, authors, imageURL) => {
    const filteredBook = this.state.books.filter((book) => {
      return book.id === id;
    });

    if (filteredBook) {
      if (filteredBook.shelf !== shelf) {
        this.updateBook(id, shelf);
      }
    }
    if (filteredBook.length === 0) {
      const newBook = {
        id: id,
        title: title,
        authors: authors,
        imageLinks: { thumbnail: imageURL },
      };
      this.setState((prevState) => ({
        books: [
          ...prevState.books,
          {
            id: id,
            title: title,
            shelf: shelf,
            authors: authors,
            imageLinks: { thumbnail: imageURL },
          },
        ],
      }));

      BooksAPI.update(newBook, shelf).then((books) => {
        console.log(books);
      });
      return newBook;
    }
  };

  updateBook = (bookID, newShelf) => {
    this.setState((prevState) => {
      const books = prevState.books.map((book) => {
        if (book.id === bookID) {
          book.shelf = newShelf;
          BooksAPI.update(book, newShelf).then((books) => {
            console.log(books);
          });
          return book;
        } else {
          return book;
        }
      });
      return books;
    });
  };
  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search">
            <Search mybooks={this.state.books} onAddBook={this.addBook} />
          </Route>
          <Route
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <Category
                    books={this.state.books}
                    onUpdateBook={this.updateBook}
                  />
                </div>
              </div>
            )}
          />
        </Switch>
        <SearchButton />
      </div>
    );
  }
}

export default BooksApp;
