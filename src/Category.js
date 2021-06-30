import React, { Component } from "react";

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
                  <li key={currentlyReading.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${currentlyReading.imageLinks.thumbnail})`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={(e) =>
                              onUpdateBook(currentlyReading.id, e.target.value)
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value={currentlyReading.shelf}>
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{currentlyReading.title}</div>
                      <div className="book-authors">
                        {currentlyReading.authors}
                      </div>
                    </div>
                  </li>
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
                  <li key={wantToRead.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${wantToRead.imageLinks.thumbnail})`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={(e) =>
                              onUpdateBook(wantToRead.id, e.target.value)
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value={wantToRead.shelf}>
                              Want to Read
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{wantToRead.title}</div>
                      <div className="book-authors">{wantToRead.authors}</div>
                    </div>
                  </li>
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
                  <li key={read.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${read.imageLinks.thumbnail})`,
                          }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={(e) =>
                              onUpdateBook(read.id, e.target.value)
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value={read.shelf}>Read</option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>

                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{read.title}</div>
                      <div className="book-authors">{read.authors}</div>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
