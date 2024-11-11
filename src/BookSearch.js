import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Booksearch.css';

function BookSearch({ addToBookshelf }) {
  const [query, setQuery] = useState('Ramayana');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const searchBooks = async () => {
    if (query) {
      setLoading(true); // Set loading to true when search is initiated
      const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
      const data = await response.json();
      setBooks(data.docs);
      setLoading(false); // Set loading to false when search response is received
    }
  };
  useEffect(() => {
    searchBooks(); // Initial search on component mount or query change
  }, [query]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchBooks();
    }
  };



  const handleAddToBookshelf = (book) => {
    addToBookshelf(book);
    toast.success(`${book.title} added to bookshelf!`);
  };

  return (
    <div className='top'>
      <h1>Search by Book Name</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Call searchBooks on Enter key press
        placeholder="Search for a book..."
        className='input'
      />

      {loading && <div className="spinner"></div>} 
      <div className='cards'>
        {books.map(book => (
          <div className='cards1' key={book.key} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h2>{book.title.length > 19 ? `${book.title.substring(0, 20)}...` : book.title}</h2>
            <p>Edition Count: {book.edition_count ? book.edition_count : 'Unknown'}</p>
            <button className='button' onClick={() => handleAddToBookshelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default BookSearch;
