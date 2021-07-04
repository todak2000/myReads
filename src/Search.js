import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
const placeholder = "https://via.placeholder.com/150";
const maxResults = 20;

class Search extends Component {
  state = {
    searchBooks: [],
  };

  searchs = (q) => {
    BooksAPI.search(q, maxResults).then((queryBooks) => {
      if (typeof queryBooks === 'undefined' || queryBooks.error || queryBooks === null || queryBooks === ""){
        this.setState(() => ({
          searchBooks: [],
        }));
      }
      // if (queryBooks.error) {
      //   this.setState(() => ({
      //     searchBooks: [],
      //   }));
      // }
      // if (queryBooks === null || "") {
      //   this.setState(() => ({
      //     searchBooks: [],
      //   }));
      // } 
      else {
        this.setState(() => ({
          searchBooks: queryBooks,
        }));
      }
    });
  };

  addRemoveBook = (id, title, shelf, authors, imageURL) => {
    const add = this.props.onAddBook(id, title, shelf, authors, imageURL);
    if (add) {
      this.setState((currentState) => ({
        searchBooks: currentState.searchBooks.filter((book) => {
          return book.id !== id;
        }),
      }));
    }
  };

  render() {
    const { searchBooks } = this.state;
    const { mybooks } = this.props;

    const options = (shelf) => {
      if (shelf === "currentlyReading") {
        return "Currently Reading";
      }
      if (shelf === "wantToRead") {
        return "Want to Read";
      }
      if (shelf === "read") {
        return "Read";
      }
    };

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.searchs(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks.length === 0 ? (
              <p>No Result</p>
            ) : (
              searchBooks.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${
                            book.imageLinks
                              ? book.imageLinks.thumbnail
                              : placeholder
                          })`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          onChange={(e) =>
                            this.addRemoveBook(
                              book.id,
                              book.title,
                              e.target.value,
                              book.authors,
                              book.imageLinks
                              ? book.imageLinks.thumbnail
                              : placeholder
                            )
                          }
                        >
                          <option value="move" disabled>
                            Move to...
                          </option>
                          {mybooks.map(
                            (existingbook) =>
                              existingbook.id === book.id && (
                                <option value={existingbook.shelf} key={existingbook.id}>
                                  {options(existingbook.shelf)}
                                </option> 
                              )
                          )}
                          <option value="none">None</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
