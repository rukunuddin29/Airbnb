import React from 'react';

function Booking() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Price Section */}
      <div className="flex gap-3 items-center text-xl font-semibold mb-4">
        <h1 className="text-gray-900">$100</h1>
        <h2 className="text-gray-600">/ night</h2>
      </div>

      <div id="date-range-picker" className="flex items-center gap-4 mb-4">
        {/* From Date */}
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
    
          </div>
          <input 
            id="datepicker-range-start" 
            name="start" 
            type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full ps-10 p-2.5" 
            placeholder="From"
          />
        </div>

        <span className="text-gray-500">to</span>

        {/* To Date */}
        <div className="relative w-1/2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           
            
          </div>
          <input 
            id="datepicker-range-end" 
            name="end" 
            type="text" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full ps-10 p-2.5" 
            placeholder="To"
          />
        </div>
      </div>

      {/* Number of Guests */}
      <div className="mb-4">
        <p className="text-gray-700 mb-1">Number of Guests</p>
        <input 
          type="number" 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" 
          min="1"
        />
      </div>

      {/* Name Input */}
      <div className="mb-4">
        <p className="text-gray-700 mb-1">Enter Your Name</p>
        <input 
          type="text" 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" 
          placeholder="John Doe"
        />
      </div>

      {/* Phone Number Input */}
      <div className="mb-4">
        <p className="text-gray-700 mb-1">Phone Number</p>
        <input 
          type="tel" 
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500" 
          placeholder="+1234567890"
        />
      </div>

      {/* Submit Button */}
      <button className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition">
        Book Now
      </button>
    </div>
  );
}

export default Booking;
