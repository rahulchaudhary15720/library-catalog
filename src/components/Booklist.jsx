// Component for the library's main book listing with enhanced features
// This component is a functional component that uses React hooks for state management
// It includes a custom hook for dynamic book filtering based on genre and search term
import React, { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Custom hook for dynamic book filtering
// This hook takes the current book list, genre filter, and search term as inputs
// It returns a memoized list of books based on the applied filters
const useBookSearch = (books, genreFilter, searchTerm) => {
  return useMemo(() => {
    let results = [...books];

    if (genreFilter !== 'all') {
      results = results.filter(book => book.genre === genreFilter);
    }

    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      results = results.filter(
        book =>
          book.title.toLowerCase().includes(lowerCaseTerm) ||
          book.author.toLowerCase().includes(lowerCaseTerm)
      );
    }

    return results;
  }, [books, genreFilter, searchTerm]);
};

// Functional component to render the book list with interactive elements
const Booklist = ({ books, setBooks }) => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('authorAsc');

  // Apply filtering based on genre and search term
  const filteredResults = useBookSearch(books, selectedGenre, searchQuery);

  // Sort the filtered books based on the selected criteria
  const sortedBooks = useMemo(() => {
    const sorted = [...filteredResults];
    if (sortCriteria === 'authorAsc') {
      sorted.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortCriteria === 'authorDesc') {
      sorted.sort((a, b) => b.author.localeCompare(a.author)).reverse(); // Reverse for descending
    }
    // Add more sorting options here if needed
    return sorted;
  }, [filteredResults, sortCriteria]);

  // Handler for genre selection changes
  const handleGenreChange = useCallback((event) => {
    setSelectedGenre(event.target.value);
  }, []);

  // Handler for search input changes
  const handleSearchInputChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  // Handler to toggle between ascending and descending author sort
  const handleSortToggle = useCallback(() => {
    setSortCriteria(prev => (prev === 'authorAsc' ? 'authorDesc' : 'authorAsc'));
  }, []);

  return (
    // Main container with consistent styling
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Page title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-5">Explore Our Library</h1>

        {/* Dashboard controls for filtering and sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="flex-grow md:flex-none w-full md:w-1/3 px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {/* Genre filter dropdown */}
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="w-full md:w-1/4 px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Genres</option>
            <option value="Mystery">Mystery</option>
            <option value="Historical Fiction">Historical Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Thriller">Thriller</option>
          </select>
          {/* Sort button */}
          <button
            onClick={handleSortToggle}
            className="w-full md:w-auto px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-200 ease-in-out"
          >
            Sort by Author ({sortCriteria === 'authorAsc' ? 'Ascending' : 'Descending'})
          </button>
        </div>

        {/* Book listing table container */}
        <div className="overflow-x-auto rounded-md shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Borrow Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedBooks.length > 0 ? (
                sortedBooks.map(book => (
                  <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/book/${book.id}`} className="text-indigo-600 hover:underline">
                        {book.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{book.genre}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {book.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{book.borrowCount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booklist;