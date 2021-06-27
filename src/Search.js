import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

const maxResults = 20;

class Search extends Component{
    state = {
        query:'',
        searchBooks:[]
    }

  	searchs = (q)=>{
    	this.setState(()=>({
            query:q
        }))
    	console.log(this.state.query)
    	BooksAPI.search(this.state.query, maxResults).then((queryBooks)=>{
      		this.setState(()=>({
        	searchBooks:queryBooks
      	}))
      	console.log(this.state.searchBooks)
      })
    } 
 
  addRemoveBook =(id,title, shelf, authors, imageURL)=>{
  	const add = this.props.onAddBook(id,title, shelf, authors, imageURL);
    if (add){
    	this.setState((currentState)=>(
      {
        searchBooks: currentState.searchBooks.filter((book)=>{
          return book.id !== id
        })
      }
    ));
     console.log(this.state.searchBooks)
    }
    
  }

    render(){
        const {searchBooks} = this.state;
        return (
           <div className="search-books">
            <div className="search-books-bar">
              <Link
          		  className="close-search"
                  to='/'>Close
              </Link>
              <div className="search-books-input-wrapper">
                <input 
          			type="text" 
          			placeholder="Search by title or author"
          			value={this.state.query}
                    onChange={(e)=>this.searchs(e.target.value)}
          		/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				      {
                  searchBooks ==='' ? null : 
                  searchBooks.map((book)=>(
                  <li key={Math.random(1000)}>
                     <div className="book">
                        <div className="book-top">
                          <div className="book-cover" 
                               style={{ 
                               width: 128, 
                                height: 193, 
                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                         }}>
                         </div>
                       <div className="book-shelf-changer">
                          <select onChange={(e)=>this.addRemoveBook(
                          	book.id, 
                            book.title, 
                            e.target.value, 
                            book.authors, 
                            book.imageLinks.thumbnail 
                          )} >
                             <option value="move" disabled>Move to...</option>
                             <option value="move"></option>
                             <option value="currentlyReading">Currently Reading</option>
                             <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>
                  ))

                }
            </ol>
            </div>
          </div>
        )
    }
}

export default Search;