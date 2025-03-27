// Component for detailed book information with borrowing functionality
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Functional component to display detailed book information and handle borrowing
function BookDetails({ books, setBooks, borrowRecords, setBorrowRecords }) {
  // Get book ID from URL
  const { id } = useParams();
  const bookId = parseInt(id);

  // Find the specific book from the provided list
  const book = books.find(b => b.id === bookId);

  // Local state to track book availability
  const [availability, setAvailability] = useState(book ? book.available : false);
  // State to manage the borrower's name input
  const [borrowerName, setBorrowerName] = useState('');
  // Filter borrowing history for the current book
  const bookBorrowHistory = borrowRecords.filter(record => record.bookId === bookId);

  // Function to handle the book borrowing process
  const handleBorrowBook = () => {
    if (availability && borrowerName.trim()) {
      // Update local availability and book data
      setAvailability(false);
      setBooks(prevBooks =>
        prevBooks.map(b =>
          b.id === bookId ? { ...b, available: false, borrowCount: (b.borrowCount || 0) + 1 } : b
        )
      );

      // Add a new borrowing record to the history
      const currentDate = new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
      setBorrowRecords(prevRecords => [
        ...prevRecords,
        { bookId, borrower: borrowerName.trim(), date: currentDate },
      ]);

      // Clear the borrower name input
      setBorrowerName('');
      alert(`Book "${book?.title}" borrowed by ${borrowerName.trim()} successfully!`); // User feedback
    } else if (!borrowerName.trim()) {
      alert('Please enter your name to borrow the book.');
    } else if (!availability) {
      alert('This book is currently unavailable.');
    }
  };

  // Handle case where book is not found
  if (!book) {
    return (
      <div className="bg-slate-50 min-h-screen py-8">
        <div className="container mx-auto px-6">
          <p className="text-red-600 text-center text-lg font-semibold mt-6">Book not found.</p>
        </div>
      </div>
    );
  }

  return (
    // Main container with consistent styling
    <div className="bg-slate-50 min-h-screen py-8">
      {/* Centered content area */}
      <div className="container mx-auto px-6">
        {/* Page heading */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">Book Details</h1>

        {/* Book details card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Book title */}
          <h2 className="text-xl font-semibold text-gray-700 mb-3">{book.title}</h2>

          {/* Book information list */}
          <ul className="space-y-1 text-gray-600 text-sm list-inside">
            <li><strong>Author:</strong> {book.author}</li>
            <li><strong>Genre:</strong> {book.genre}</li>
            <li><strong>ISBN:</strong> {book.isbn}</li>
            <li><strong>Publisher:</strong> {book.publisher}</li>
            <li><strong>Borrow Count:</strong> {book.borrowCount || 0}</li>
            <li>
              <strong>Availability:</strong>{' '}
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {availability ? 'Available' : 'Unavailable'}
              </span>
            </li>
          </ul>

          {/* Borrowing controls */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            {/* Input for borrower's name */}
            <input
              type="text"
              placeholder="Your Name"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              className="flex-grow sm:flex-none w-full sm:w-64 px-3 py-2 border rounded-md text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {/* Borrow button */}
            <button
              onClick={handleBorrowBook}
              disabled={!availability || !borrowerName.trim()}
              className={`px-4 py-2 rounded-md text-white ${availability && borrowerName.trim() ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-400 cursor-not-allowed'} transition duration-200`}
            >
              Borrow Book
            </button>
          </div>

          {/* Borrowing history section */}
          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Borrowing History</h3>

          {/* List of borrowing records */}
          <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
            {bookBorrowHistory.length > 0 ? (
              bookBorrowHistory.map((record, index) => (
                <li key={index}>
                  Borrowed by <span className="font-medium">{record.borrower}</span> on{' '}
                  {new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </li>
              ))
            ) : (
              <li>No borrowing history available for this book.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;