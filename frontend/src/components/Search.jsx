import React from 'react';
import { FaSearch } from "react-icons/fa";




function Search() {
  // const [search,setSearch]=(false);

  // const toggle()=>{
  //   setSearch(true)
  // }
 
  return (
<>
{/* <div className="flex justify-center items-center py-5 px-3 md:hidden" >
  <div className="w-full max-w-2xl bg-white rounded-full shadow-md border border-gray-200 px-4 py-2 flex items-center gap-2">
   
    <input
      type="text"
      placeholder="⌕ Start your Search "
      className="w-full text-center bg-transparent outline-none text-black placeholder:text-gray-500"
    />
  </div>
</div> */}



<div className="w-full flex items-center justify-center px-4 py-6">
<div className="w-full max-w-4xl border border-gray-200 rounded-2xl lg:rounded-full flex flex-col sm:flex-row items-center bg-white shadow-lg p-2 gap-2 sm:gap-4">

        
        {/* Destination */}
        <div className="flex-1 w-full sm:w-auto px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Where</h4>
          <input
            type="text"
            placeholder="Search Destination"
            className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Check-in Date */}
        <div className="flex-1 w-full sm:w-auto px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Check-in</h4>
          <input
            type="date"
            className="w-full outline-none bg-transparent text-sm text-gray-800"
          />
        </div>

        {/* Check-out Date */}
        <div className="flex-1 w-full sm:w-auto px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Check-out</h4>
          <input
            type="date"
            className="w-full outline-none bg-transparent text-sm text-gray-800"
          />
        </div>

        {/* Number of Guests */}
        <div className="flex-1 w-full sm:w-auto px-3 py-2 rounded-full  hover:bg-gray-100 transition-colors duration-200">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Guests</h4>
          <input
            type="number"
            min="1"
            placeholder="Add guests"
            className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Search Button */}
        <button className="w-full sm:w-auto bg-rose-500 text-white p-3 rounded-full hover:bg-rose-600 transition-colors duration-200 flex items-center justify-center">
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </div>
    </>
  );
 
} 

export default Search;