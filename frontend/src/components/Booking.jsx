import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

function Booking({ propertyId }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [checkoutError, setCheckoutError] = useState("");
  const { properties } = useUserContext();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const found = properties.find((item) => item._id === propertyId);
    setProperty(found);
  }, [propertyId, properties]);

  const handleCheckInChange = (e) => {
    const selected = e.target.value;
    setCheckIn(selected);

    // Reset checkOut if it's not valid anymore
    if (checkOut && new Date(checkOut) <= new Date(selected)) {
      setCheckOut("");
      setCheckoutError("Check-out must be at least 1 day after check-in.");
    } else {
      setCheckoutError("");
    }
  };

  const handleCheckOutChange = (e) => {
    const selected = e.target.value;

    if (!checkIn) {
      setCheckoutError("Please select check-in first.");
      return;
    }

    const minCheckOut = new Date(checkIn);
    minCheckOut.setDate(minCheckOut.getDate() + 1);

    if (new Date(selected) < minCheckOut) {
      setCheckoutError("Check-out must be at least 1 day after check-in.");
    } else {
      setCheckOut(selected);
      setCheckoutError("");
    }
  };

  const handleBook = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to book this property.");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (checkoutError) {
      alert("Please fix the date errors before booking.");
      return;
    }

    try {
      const bookingData = { propertyId, checkIn, checkOut, guests };
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Booking successful!");
      // navigate("/booking-confirmation", { state: { booking: response.data } });
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  if (!property) return <p className="text-center">Loading property info...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex gap-3 items-center text-xl font-semibold mb-4">
        <h1 className="text-gray-900 flex items-baseline gap-1">
          ₹{property.price.toLocaleString("en-IN")}
          <span className="text-gray-600 text-sm">/night</span>
        </h1>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="date"
          value={checkIn}
          onChange={handleCheckInChange}
          className="w-1/2 p-2 border rounded-lg"
          min={new Date().toISOString().split("T")[0]}
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={checkOut}
          onChange={handleCheckOutChange}
          className="w-1/2 p-2 border rounded-lg"
          min={
            checkIn
              ? new Date(
                  new Date(checkIn).setDate(new Date(checkIn).getDate() + 1)
                )
                  .toISOString()
                  .split("T")[0]
              : ""
          }
        />
      </div>

      {checkoutError && (
        <p className="text-red-500 text-sm mb-3">{checkoutError}</p>
      )}

      <div className="mb-4">
        <p className="text-gray-700 mb-1">Number of Guests</p>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        onClick={handleBook}
        className="w-full bg-rose-600 text-white py-2 rounded-md hover:bg-rose-700 transition"
      >
        Book Now
      </button>
    </div>
  );
}

export default Booking;
