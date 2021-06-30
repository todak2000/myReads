import React from "react";

function BookItem(props) {
  // const { books, onUpdateBook } = this.props;
  console.log(props.bookCategory);
  return (
    <li key={props.bookCategory.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${props.bookCategory.imageLinks.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
          {props.bookCategory.shelf === "currentlyReading" &&
            <select
              onChange={(e) =>
                props.onUpdateBook(props.bookCategory.id, e.target.value)
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value={props.bookCategory.shelf}>{props.selectedOption}</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          }
          {props.bookCategory.shelf === "read" &&
            <select
              onChange={(e) =>
                props.onUpdateBook(props.bookCategory.id, e.target.value)
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value={props.bookCategory.shelf}>{props.selectedOption}</option>
              <option value="wantToRead">Want to Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="none">None</option>
            </select>
          }
          {props.bookCategory.shelf === "wantToRead" &&
            <select
              onChange={(e) =>
                props.onUpdateBook(props.bookCategory.id, e.target.value)
              }
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value={props.bookCategory.shelf}>{props.selectedOption}</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          }
          </div>
        </div>
        <div className="book-title">{props.bookCategory.title}</div>
        <div className="book-authors">{props.bookCategory.authors}</div>
      </div>
    </li>
  );
}

export default BookItem;
