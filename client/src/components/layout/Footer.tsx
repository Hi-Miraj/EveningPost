import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-black py-10 border-t border-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-['Playfair_Display'] font-bold mb-4">
              THE EVENING POST
            </h3>
            <p className="text-gray-400 mb-4">
              Unfiltered. Unbiased. For Everyone.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/politics">
                  <a className="text-gray-400 hover:text-red-600 transition-colors">Politics</a>
                </Link>
              </li>
              <li>
                <Link href="/category/business">
                  <a className="text-gray-400 hover:text-red-600 transition-colors">Business</a>
                </Link>
              </li>
              <li>
                <Link href="/category/technology">
                  <a className="text-gray-400 hover:text-red-600 transition-colors">Technology</a>
                </Link>
              </li>
              <li>
                <Link href="/category/science">
                  <a className="text-gray-400 hover:text-red-600 transition-colors">Science</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us">
                  <a className="text-gray-400 hover:text-red-600 transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-red-600 transition-colors">Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-gray-400 hover:text-red-600 transition-colors">Careers</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-gray-500">© {new Date().getFullYear()} The Evening Post. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
