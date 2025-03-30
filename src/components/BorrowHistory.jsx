import React, { useMemo } from 'react';

const BorrowHistory = () => {
  // Dummy book collection data
  const bookCollection = [
    { id: 'b001', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 'b002', title: '1984', author: 'George Orwell' },
    { id: 'b003', title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 'b004', title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 'b005', title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: 'b006', title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 'b007', title: 'Brave New World', author: 'Aldous Huxley' }
  ];

  // Dummy transaction data
  const transactions = [
    { id: 't001', bookId: 'b001', borrowerId: 'u003', borrowerName: 'Emma Wilson', timestamp: '2025-03-25T14:32:00', status: 'active', dueDate: '2025-04-15' },
    { id: 't002', bookId: 'b003', borrowerId: 'u002', borrowerName: 'James Miller', timestamp: '2025-03-20T09:15:00', status: 'active', dueDate: '2025-04-10' },
    { id: 't003', bookId: 'b002', borrowerId: 'u001', borrowerName: 'Sophia Chen', timestamp: '2025-03-18T16:45:00', status: 'returned', returnDate: '2025-03-27' },
    { id: 't004', bookId: 'b005', borrowerId: 'u004', borrowerName: 'Noah Garcia', timestamp: '2025-03-12T10:20:00', status: 'active', dueDate: '2025-04-02' },
    { id: 't005', bookId: 'b004', borrowerId: 'u003', borrowerName: 'Emma Wilson', timestamp: '2025-03-05T13:50:00', status: 'returned', returnDate: '2025-03-15' },
    { id: 't006', bookId: 'b006', borrowerId: 'u005', borrowerName: 'Olivia Johnson', timestamp: '2025-02-27T11:30:00', status: 'returned', returnDate: '2025-03-10' },
    { id: 't007', bookId: 'b007', borrowerId: 'u002', borrowerName: 'James Miller', timestamp: '2025-02-20T14:15:00', status: 'returned', returnDate: '2025-03-01' },
    { id: 't008', bookId: 'b001', borrowerId: 'u001', borrowerName: 'Sophia Chen', timestamp: '2025-02-15T09:45:00', status: 'returned', returnDate: '2025-02-25' },
    { id: 't009', bookId: 'b003', borrowerId: 'u004', borrowerName: 'Noah Garcia', timestamp: '2025-02-10T16:30:00', status: 'returned', returnDate: '2025-02-20' },
    { id: 't010', bookId: 'b002', borrowerId: 'u005', borrowerName: 'Olivia Johnson', timestamp: '2025-02-05T11:00:00', status: 'returned', returnDate: '2025-02-15' }
  ];

  // Process and sort transactions by date (newest first)
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [transactions]);

  // Generate human-readable date format
  const formatDateToLocale = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Find book details by ID with error handling
  const getBookDetails = (bookId) => {
    const foundBook = bookCollection.find(item => item.id === bookId);
    return foundBook || { title: 'Unknown Book', author: 'Unknown Author' };
  };

  // Group transactions by month for better organization
  const groupedByMonth = useMemo(() => {
    const groups = {};
    
    sortedTransactions.forEach(transaction => {
      const date = new Date(transaction.timestamp);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!groups[monthKey]) {
        groups[monthKey] = {
          label: date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' }),
          items: []
        };
      }
      
      groups[monthKey].items.push(transaction);
    });
    
    return Object.values(groups);
  }, [sortedTransactions]);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header with responsive typography */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Transaction History</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Comprehensive record of all borrowing activities
          </p>
        </header>

        {/* Transaction records container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Summary statistics */}
          <div className="p-4 sm:p-6 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Total Transactions</p>
                <p className="text-xl font-semibold text-gray-900">{transactions.length}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Active Borrowers</p>
                <p className="text-xl font-semibold text-gray-900">
                  {new Set(transactions.map(t => t.borrowerId)).size}
                </p>
              </div>
              <div className="hidden sm:block bg-white p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 mb-1">Popular Books</p>
                <p className="text-xl font-semibold text-gray-900">
                  {new Set(transactions.map(t => t.bookId)).size}
                </p>
              </div>
            </div>
          </div>

          {/* Transaction listing */}
          <div className="divide-y divide-gray-100">
            {groupedByMonth.length > 0 ? (
              groupedByMonth.map((group, groupIndex) => (
                <div key={groupIndex} className="py-2">
                  <h3 className="px-4 sm:px-6 py-2 text-sm font-medium text-gray-600 bg-gray-50">
                    {group.label}
                  </h3>
                  <ul className="divide-y divide-gray-50">
                    {group.items.map((record, recordIndex) => {
                      const book = getBookDetails(record.bookId);
                      return (
                        <li key={recordIndex} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors">
                          <div className="sm:flex sm:justify-between sm:items-center">
                            <div className="mb-2 sm:mb-0">
                              <h4 className="text-indigo-600 font-medium text-base">
                                {book.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                by {book.author}
                              </p>
                            </div>
                            <div className="text-sm text-right">
                              <p className="text-gray-700 font-medium">
                                {record.borrowerName}
                              </p>
                              <time className="text-gray-500 text-xs">
                                {formatDateToLocale(record.timestamp)}
                              </time>
                            </div>
                          </div>
                          
                          <div className="mt-2 flex items-center">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              record.status === 'returned' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {record.status === 'returned' ? 'Returned' : 'Active'}
                            </span>
                            {record.dueDate && (
                              <span className="ml-2 text-xs text-gray-500">
                                Due: {new Date(record.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-500 text-lg">No transaction records found</p>
                <p className="mt-2 text-gray-400 text-sm">Records will appear here once books are borrowed</p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination control for larger datasets */}
        {transactions.length > 10 && (
          <div className="mt-6 flex justify-between items-center">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page 1 of {Math.ceil(transactions.length / 10)}
            </span>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowHistory;