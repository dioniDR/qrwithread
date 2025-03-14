import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Scanner', icon: '📷' },
    { path: '/history', label: 'History', icon: '📚' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              QR Scanner
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-primary-100'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-primary-100"
          >
            ☰
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-primary-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
