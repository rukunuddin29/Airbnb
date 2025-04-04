import React from 'react';
import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <div className="w-full flex items-center justify-center px-4 py-6">
      <div className="w-full md:w-3/4 lg:w-1/2 border border-gray-200 rounded-full flex items-center bg-white shadow-lg p-1 gap-4">
        
        {/* Destination */}
        <div className="w-1/2 px-4 py-2 rounded-full hover:bg-gray-200">
          <h4 className="text-sm font-semibold text-gray-600 ">Where?</h4>
          <input
            type="text"
            placeholder="Search Destination"
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Check-in Date */}
        <div className="w-1/4 px-4 py-2 rounded-full hover:bg-gray-200">
          <h4 className="text-sm font-semibold text-gray-600">Check-in</h4>
          <input
            type="date"
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Check-out Date */}
        <div className="w-1/2 px-4 py-2 rounded-full hover:bg-gray-200">
          <h4 className="text-sm font-semibold text-gray-600">Check-out</h4>
          <input
            type="date"
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Number of Guests */}
        <div className="w-1/3 px-4 py-2 rounded-full hover:bg-gray-200">
          <h4 className="text-sm font-semibold text-gray-600">Guests</h4>
          <input
            type="number"
            min="1"
            placeholder="Guests"
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* Search Button */}
        <button className="bg-rose-500 text-white px-3 py-3 rounded-full hover:bg-rose-600">
          <FaSearch/>
        </button>
      </div>
    </div>
  );
}

export default Search;
