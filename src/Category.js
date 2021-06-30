import React, { Component } from "react";
import BookItem from "./BookItem";

class Category extends Component {

  render() {
    const { books, onUpdateBook } = this.props;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books
                .filter((book) => book.shelf === "currentlyReading")
                .map((currentlyReading) => (
                  <BookItem 
                    bookCategory={currentlyReading}
                    onUpdateBook={onUpdateBook}
                    selectedOption="Currently Reading"
                  />
                ))}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books
                .filter((book) => book.shelf === "wantToRead")
                .map((wantToRead) => (
                  <BookItem 
                    bookCategory={wantToRead}
                    onUpdateBook={onUpdateBook}
                    selectedOption="Want to Read"
                  />
                ))}
            </ol>
          </div>
        </div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books
                .filter((book) => book.shelf === "read")
                .map((read) => (
                  <BookItem 
                    bookCategory={read}
                    onUpdateBook={onUpdateBook}
                    selectedOption="Read"
                  />
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
