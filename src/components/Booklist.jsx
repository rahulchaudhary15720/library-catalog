import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom hook for filtering catalog items based on multiple criteria
const useCatalogFilter = (collection, categoryFilter, queryText) => {
  return useMemo(() => {
    // Check if collection is an array before trying to spread it
    if (!Array.isArray(collection)) {
      return [];
    }

    // Create a new array to avoid mutating the original
    let filteredItems = [...collection];

    // Apply category filtering if not showing all
    if (categoryFilter && categoryFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.genre === categoryFilter);
    }

    // Apply text search if query exists
    if (queryText && queryText.trim().length > 0) {
      const normalizedQuery = queryText.toLowerCase().trim();
      filteredItems = filteredItems.filter(
        item =>
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.author.toLowerCase().includes(normalizedQuery)
      );
    }

    return filteredItems;
  }, [collection, categoryFilter, queryText]);
};

// Main catalog component
const Booklist = ({ books, setBooks }) => {
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [orderingMethod, setOrderingMethod] = useState('nameAscending');
  const [isCompactView, setIsCompactView] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Apply our filter hook - ensure books is an array
  const filteredItems = useCatalogFilter(books || [], activeCategory, searchText);

  // Sort the filtered results based on current ordering preference
  const organizedItems = useMemo(() => {
    const sortedCollection = [...filteredItems];
    
    switch (orderingMethod) {
      case 'nameAscending':
        return sortedCollection.sort((a, b) => a.author.localeCompare(b.author));
      case 'nameDescending':
        return sortedCollection.sort((a, b) => b.author.localeCompare(a.author));
      case 'titleAscending':
        return sortedCollection.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleDescending':
        return sortedCollection.sort((a, b) => b.title.localeCompare(a.title));
      case 'popularityDescending':
        return sortedCollection.sort((a, b) => b.borrowCount - a.borrowCount);
      default:
        return sortedCollection;
    }
  }, [filteredItems, orderingMethod]);

  // Event handlers with debounced search
  const handleCategorySelection = (e) => {
    setActiveCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setOrderingMethod(e.target.value);
  };

  const handleItemClick = (itemId) => {
    navigate(`/book/${itemId}`);
  };

  const toggleViewMode = () => {
    setIsCompactView(!isCompactView);
  };

  // Focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Calculate stats for display - with safety checks
  const totalItems = Array.isArray(books) ? books.length : 0;
  const filteredCount = organizedItems.length;
  const availableCount = organizedItems.filter(item => item.available).length;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with stats */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">Digital Library Collection</h1>
          <p className="text-gray-600">
            Browsing {filteredCount} of {totalItems} items 
            ({availableCount} currently available)
          </p>
        </header>

        {/* Controls section */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search box */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Collection</label>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Enter title or author..."
                value={searchText}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              {searchText && (
                <button 
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchText('')}
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Filter dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Genre</label>
              <select
                value={activeCategory}
                onChange={handleCategorySelection}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="all">All Genres</option>
                <option value="Mystery">Mystery</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Thriller">Thriller</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Biography">Biography</option>
              </select>
            </div>
            
            {/* Sort dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Results</label>
              <select
                value={orderingMethod}
                onChange={handleOrderingChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="nameAscending">Author (A-Z)</option>
                <option value="nameDescending">Author (Z-A)</option>
                <option value="titleAscending">Title (A-Z)</option>
                <option value="titleDescending">Title (Z-A)</option>
                <option value="popularityDescending">Most Borrowed</option>
              </select>
            </div>
          </div>
          
          {/* Toggle view button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={toggleViewMode}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {isCompactView ? 'Detailed View' : 'Compact View'}
            </button>
          </div>
        </section>

        {/* Results display */}
        {isCompactView ? (
          /* Compact View (Grid Layout) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {organizedItems.length > 0 ? (
              organizedItems.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className="bg-white rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow p-4"
                >
                  <h3 className="font-semibold text-lg text-indigo-700 mb-2 truncate">{item.title}</h3>
                  <p className="text-gray-700 text-sm mb-2">{item.author}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{item.genre}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.available ? 'Available' : 'Checked Out'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">No matching items found in the collection.</p>
                <button 
                  onClick={() => {setSearchText(''); setActiveCategory('all');}}
                  className="mt-2 text-indigo-600 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Detailed View (Table Layout) */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Circulation</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {organizedItems.length > 0 ? (
                    organizedItems.map(item => (
                      <tr 
                        key={item.id} 
                        onClick={() => handleItemClick(item.id)}
                        className="cursor-pointer hover:bg-indigo-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-indigo-600">{item.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{item.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700">{item.genre}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.available ? 'Available' : 'Checked Out'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {item.borrowCount} times
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        <p>No matching items found in the collection.</p>
                        <button 
                          onClick={() => {setSearchText(''); setActiveCategory('all');}}
                          className="mt-2 text-indigo-600 hover:underline"
                        >
                          Reset filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Digital Library Management System</p>
        </footer>
      </div>
    </div>
  );
};

export default Booklist;