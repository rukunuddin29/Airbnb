import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import axios from "axios";
import HotelList from "../components/HotelList";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
        setError("Failed to load hotels. Please try again later.");
      }
    };

    fetchHotels();
  }, []);

  return (
    <>
      <Navbar />
      <Search />

      <div className="px-20 my-6">
        {error && <p className="text-red-500">{error}</p>}

        {Array.isArray(hotels) && hotels.length > 0 ? (
          <HotelList hotels={hotels} />
        ) : (
          <p className="text-center text-gray-500">No hotels found.</p>
        )}
      </div>
    </>
  );
}

export default Home;
