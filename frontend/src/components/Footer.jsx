import React from 'react';

function Footer() {
  return (
    <footer className="w-full py-14 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <ul className="text-lg flex items-center justify-center flex-col gap-6 md:flex-row md:gap-12 transition-all duration-500 py-8 mb-6 border-b border-gray-700">
            <li><a href="#" className="hover:text-gray-500">Home</a></li>
            <li><a href="#" className="hover:text-gray-500">Products</a></li>
            <li><a href="#" className="hover:text-gray-500">Resources</a></li>
            <li><a href="#" className="hover:text-gray-500">Blogs</a></li>
            <li><a href="#" className="hover:text-gray-500">Support</a></li>
          </ul>

          <div className="flex space-x-6 justify-center items-center mb-6">
            <a href="#" className="hover:text-gray-500">Facebook</a>
            <a href="#" className="hover:text-gray-500">Twitter</a>
            <a href="#" className="hover:text-gray-500">LinkedIn</a>
            <a href="#" className="hover:text-gray-500">Instagram</a>
          </div>

          <span className="text-sm text-gray-400 block">
            © 2024 <a href="#" className="hover:text-gray-300">YourCompany</a>. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
