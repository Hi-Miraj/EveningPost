import { Link } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="border-b border-gray-800 bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <a className="block">
                <h1 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-2">
                  THE EVENING POST
                </h1>
                <p className="text-sm text-gray-400">
                  Delivering reliable, timely and insightful news coverage from around the globe.
                </p>
              </a>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={`md:flex items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 w-full md:w-auto ${isMenuOpen ? 'flex flex-col pt-4' : 'hidden'}`}>
            <Link href="/">
              <a className="text-white hover:text-red-600 transition-colors duration-200">
                Home
              </a>
            </Link>
            
            <div className="relative group">
              <button className="text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-1 w-48 bg-gray-900 shadow-lg rounded-md py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-1 group-hover:translate-y-0">
                {/* Extra padding div to ensure smooth hover between button and dropdown */}
                <div className="absolute h-2 w-full -top-2"></div>
                <Link href="/category/politics">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Politics
                  </a>
                </Link>
                <Link href="/category/business">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Business
                  </a>
                </Link>
                <Link href="/category/technology">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Technology
                  </a>
                </Link>
                <Link href="/category/science">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Science
                  </a>
                </Link>
                <Link href="/category/world">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    World
                  </a>
                </Link>
                <Link href="/category/sports">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Sports
                  </a>
                </Link>
                <Link href="/category/opinion">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Opinion
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="relative group">
              <button className="text-white hover:text-red-600 transition-colors duration-200 flex items-center">
                Company <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-gray-900 shadow-lg rounded-md py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out transform translate-y-1 group-hover:translate-y-0">
                {/* Extra padding div to ensure smooth hover between button and dropdown */}
                <div className="absolute h-2 w-full -top-2"></div>
                <Link href="/about-us">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    About Us
                  </a>
                </Link>
                <Link href="/contact">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Contact
                  </a>
                </Link>
                <Link href="/careers">
                  <a className="block px-4 py-2 text-sm text-white hover:bg-gray-800 hover:text-red-600">
                    Careers
                  </a>
                </Link>
              </div>
            </div>
            
            <div>
              <button className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-red-600 hover:border-red-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
