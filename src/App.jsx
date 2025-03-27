// Entry point of the application
// This file contains the routing logic for the application
import {useState ,React} from 'react';
// It uses the BrowserRouter, Route, and Routes components from react-router-dom to set up routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Navbar component is imported to display the navigation bar
import Navbar from './components/Navbar.jsx';
// BookList component is imported to display the list of books
import Booklist from './components/Booklist.jsx';
// BookDetail component is imported to display the details of a book
import BookDetail from './components/BookDetails.jsx';
// BorrowHistory component is imported to display the borrow history of a user
import BorrowHistory from './components/BorrowHistory.jsx';
// The App.css file is imported to apply styles to the components

import { books as initialBookData, borrowHistory as initialBorrowData } from './data/books';
// The initial book data is imported from the data/books.js file
import './App.css';

function App() {
  // Centralized state for the book list
  const [booklist, setBookList] = useState(initialBookData);
 // State for borrowing history, enabling tracking across components
 const [borrowRecords, setBorrowRecords] = useState(initialBorrowData);
  // Sets up routing for navigating between different pages of the app
  return (
    <>
      {/* Fragment is used to wrap multiple elements */}
      <Router>
        {/* Router component is used to set up routing */}
        <div className="min-h-screen bg-gray-100">
          {/* Navbar component is used to display the navigation bar */}
          <Navbar />

          {/* Routes component is used to define the routes for different pages */}
          <Routes>
            {/* Route component is used to define a route for the home page */}
            <Route path="/" element={<Booklist books={booklist} setBooks={setBookList} borrowRecords={borrowRecords}  />} />

            {/* Route component is used to define a route for the book detail page */}
            <Route path="/book/:id" element={<BookDetail books={booklist} setBooks={setBookList} borrowRecords={borrowRecords} setBorrowRecords={setBorrowRecords} />} />

            {/* Route component is used to define a route for the borrow history page */}
            <Route path="/borrow-history" element={<BorrowHistory books={booklist} borrowRecords={borrowRecords} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;