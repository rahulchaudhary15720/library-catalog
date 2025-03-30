import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Volume information display with borrowing functionality
function BookDetails({ books, setBooks, borrowRecords, setBorrowRecords }) {
  // Navigation and routing hooks
  const navigate = useNavigate();
  const { id } = useParams();
  const volumeId = parseInt(id);
  
  // Find target volume in collection
  const currentVolume = books.find(volume => volume.id === volumeId);
  
  // Establish local state management
  const [isLendable, setIsLendable] = useState(false);
  const [readerName, setReaderName] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showHistorySection, setShowHistorySection] = useState(false);
  
  // Extract lending history for current volume
  const lendingHistory = borrowRecords.filter(entry => entry.bookId === volumeId);
  
  // Synchronize availability state with props
  useEffect(() => {
    if (currentVolume) {
      setIsLendable(currentVolume.available);
    }
  }, [currentVolume]);
  
  // Process lending request
  const processLendingRequest = () => {
    // Input validation
    if (!readerName.trim()) {
      setErrorMessage('Please provide your name to proceed with borrowing');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    if (!isLendable) {
      setErrorMessage('This title is currently unavailable for borrowing');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    // Update volume availability
    setIsLendable(false);
    
    // Update global books collection
    setBooks(currentCollection => 
      currentCollection.map(volume => 
        volume.id === volumeId 
          ? { 
              ...volume, 
              available: false, 
              borrowCount: (volume.borrowCount || 0) + 1 
            } 
          : volume
      )
    );
    
    // Create timestamp for lending record
    const formattedDate = new Date().toISOString().split('T')[0];
    
    // Add new lending record
    setBorrowRecords(existingRecords => [
      ...existingRecords,
      { 
        bookId: volumeId, 
        borrower: readerName.trim(), 
        date: formattedDate 
      }
    ]);
    
    // Reset form and show success feedback
    setReaderName('');
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
    
    // Automatically expand history after lending
    setShowHistorySection(true);
  };
  
  // Return to catalog
  const returnToCatalog = () => {
    navigate('/');
  };
  
  // Toggle history visibility
  const toggleHistoryView = () => {
    setShowHistorySection(!showHistorySection);
  };
  
  // Handle case where volume is not found
  if (!currentVolume) {
    return (
      <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Volume Not Found</h2>
            <p className="text-gray-600 mb-6">The requested title could not be located in our collection.</p>
            <button
              onClick={returnToCatalog}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page header with navigation */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-indigo-800">Volume Details</h1>
          <button
            onClick={returnToCatalog}
            className="px-4 py-2 text-indigo-600 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors flex items-center"
          >
            <span>Back to Catalog</span>
          </button>
        </div>
        
        {/* Main content container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Volume information header */}
          <div className="p-6 md:p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">{currentVolume.title}</h2>
            <p className="text-lg text-gray-600 mb-2">by {currentVolume.author}</p>
            
            {/* Status indicator */}
            <div className="mb-4">
              <span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isLendable 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                {isLendable ? 'Available for Borrowing' : 'Currently on Loan'}
              </span>
            </div>
          </div>
          
          {/* Volume details section */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column: Volume metadata */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Publication Details</h3>
              <dl className="grid grid-cols-3 gap-2 text-sm">
                <dt className="col-span-1 text-gray-500">Genre:</dt>
                <dd className="col-span-2 text-gray-800 font-medium">{currentVolume.genre}</dd>
                
                <dt className="col-span-1 text-gray-500">ISBN:</dt>
                <dd className="col-span-2 text-gray-800 font-medium">{currentVolume.isbn || 'Not available'}</dd>
                
                <dt className="col-span-1 text-gray-500">Publisher:</dt>
                <dd className="col-span-2 text-gray-800 font-medium">{currentVolume.publisher || 'Not available'}</dd>
                
                <dt className="col-span-1 text-gray-500">Popularity:</dt>
                <dd className="col-span-2 text-gray-800 font-medium">
                  Borrowed {currentVolume.borrowCount || 0} {currentVolume.borrowCount === 1 ? 'time' : 'times'}
                </dd>
              </dl>
            </div>
            
            {/* Right column: Borrowing interface */}
            <div className={`p-4 rounded-lg ${isLendable ? 'bg-green-50' : 'bg-gray-50'}`}>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Borrowing Request</h3>
              
              {showSuccessMessage && (
                <div className="mb-4 p-3 bg-green-100 border border-green-200 rounded-lg text-green-800">
                  <p>Success! "{currentVolume.title}" has been checked out.</p>
                </div>
              )}
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg text-red-800">
                  <p>{errorMessage}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="readerName" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="readerName"
                    type="text"
                    value={readerName}
                    onChange={(e) => setReaderName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={!isLendable}
                  />
                </div>
                
                <button
                  onClick={processLendingRequest}
                  disabled={!isLendable || !readerName.trim()}
                  className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                    isLendable && readerName.trim()
                      ? 'bg-indigo-600 hover:bg-indigo-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  } transition-colors`}
                >
                  {isLendable ? 'Borrow This Volume' : 'Currently Unavailable'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Borrowing history section */}
          <div className="border-t border-gray-100">
            <button 
              onClick={toggleHistoryView}
              className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Lending History
              </h3>
              <span className="text-gray-500">
                {showHistorySection ? '▲ Hide' : '▼ Show'}
              </span>
            </button>
            
            {showHistorySection && (
              <div className="p-6">
                {lendingHistory.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {lendingHistory.map((record, index) => (
                      <li key={index} className="py-3 flex justify-between">
                        <span className="font-medium text-gray-800">{record.borrower}</span>
                        <span className="text-gray-500">
                          {new Date(record.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No lending history available for this volume.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;