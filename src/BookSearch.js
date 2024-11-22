import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Booksearch.css';

function BookSearch({ addToBookshelf }) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch books based on query
  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    try {
      const url = searchQuery
        ? `https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`
        : `https://openlibrary.org/search.json?q=programming&limit=10&page=1`; // Default query
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch default books on component load
  useEffect(() => {
    fetchBooks('programming'); // Default books
  }, []);

  // Fetch books as the query changes, with debounce
  useEffect(() => {
    if (query) {
      const timeoutId = setTimeout(() => {
        fetchBooks(query);
      }, 500); // Delay of 500ms for debounce

      return () => clearTimeout(timeoutId); // Cleanup previous timeout
    }
  }, [query]);

  const handleAddToBookshelf = (book) => {
    addToBookshelf(book);
    toast.success(`${book.title} added to bookshelf!`);
  };

  return (
    <div className="top">
      <h1>Search by Book Name</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book..."
        className="input"
      />

      {loading && <div className="spinner"></div>}
      <div className="cards">
        {books.map((book) => (
          <div
            className="cards1"
            key={book.key}
            style={{
              border: '1px solid black',
              margin: '10px',
              padding: '10px',
            }}
          >
            <h2>{book.title.length > 19 ? `${book.title.substring(0, 20)}...` : book.title}</h2>
            <p>Edition Count: {book.edition_count ? book.edition_count : 'Unknown'}</p>
            <button
              className="button"
              onClick={() => handleAddToBookshelf(book)}
            >
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default BookSearch;

