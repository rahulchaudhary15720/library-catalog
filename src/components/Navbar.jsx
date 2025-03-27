// Component for navigation between pages
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    // Navigation bar with a blue background and padding
    <nav className="bg-blue-500 p-4 shadow-md">
      {/* Container with flex layout and space between elements */}
      {/* Links to the home page and borrow history page */}
      <div className="container mx-auto flex space-x-4">
        {/* Link to the home page */}
        <Link to="/" className="text-white text-lg font-semibold hover:underline">Home</Link>
        {/* Link to the borrow history page */}
        <Link to="/borrow-history" className="text-white text-lg font-semibold hover:underline">Borrow History</Link>
      </div>
    </nav>
  );
}

export default Navbar;