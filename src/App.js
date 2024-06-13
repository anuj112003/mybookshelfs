
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import BookSearch from './BookSearch';
import Bookshelf from './BookShelf';

function App() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  useEffect(() => {
    localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
  }, [bookshelf]);

  const addToBookshelf = (book) => {
    setBookshelf([...bookshelf, book]);
  };

  return (
    <Router>
      <nav>
        <Link to="/"  className='mybook1'>Search</Link>
        <Link to="/bookshelf" className='mybook'>My Bookshelf</Link>
      </nav>
      <Routes>
        <Route path="/" element={<BookSearch addToBookshelf={addToBookshelf} />} />
        <Route path="/bookshelf" element={<Bookshelf bookshelf={bookshelf} />} />
      </Routes>
    </Router>
  );
}

export default App;

