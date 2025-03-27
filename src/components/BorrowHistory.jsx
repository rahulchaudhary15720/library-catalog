// Component for displaying a comprehensive borrowing activity log
import React from 'react';

// Functional component to render the complete borrowing history
const BorrowHistory = ({ books, borrowRecords }) => {
  return (
    // Main container with consistent page styling
    <div className="bg-slate-50 min-h-screen py-8">
      {/* Centered content area */}
      <div className="container mx-auto px-6">
        {/* Prominent page title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">Library Transaction History</h1>

        {/* Container for the transaction list */}
        <div className="bg-white p-5 rounded-md shadow-md">
          {/* Section heading for the borrowing history */}
          <h2 className="text-lg font-semibold text-gray-700 mb-3">All Borrowing Records</h2>

          {/* Ordered list to display each borrowing event */}
          <ol className="list-decimal list-inside text-gray-700 text-sm space-y-2">
            {Array.isArray(borrowRecords) && borrowRecords.length > 0 ? (
              borrowRecords.map((record, index) => {
                const book = books.find(b => b.id === record.bookId);
                return (
                  // Individual log entry with key information
                  <li key={index} className="text-gray-600">
                    <span className="font-medium text-indigo-600">{book?.title || 'Unknown Title'}</span> borrowed by <span className="font-semibold">{record.borrower}</span> on{' '}
                    <span className="italic">{new Date(record.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </li>
                );
              })
            ) : (
              // Displayed when no borrowing records are found
              <p className="text-gray-500 italic text-center">No borrowing activity recorded yet.</p>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default BorrowHistory;