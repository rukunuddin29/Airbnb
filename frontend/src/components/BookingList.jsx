import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
      }
    };

    fetchBookings();
  }, []);

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(diff));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings found.</p>
      ) : (
        <div className="space-y-8">
          {bookings.map((booking) => {
            const nights = calculateNights(booking.checkIn, booking.checkOut);
            const pricePerNight = booking.propertyId?.price || 0;
            const totalPrice = pricePerNight * nights;

            return (
              <div
                key={booking._id}
                className="flex flex-col md:flex-row gap-6 p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                {/* Property Image */}
                <img
                  src={booking.propertyId?.images?.[0]}
                  alt="Property"
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />

                {/* Booking Info */}
                <div className="flex-1 text-gray-700">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {booking.propertyId?.title || "Property"}
                  </h3>
                  <p><span className="font-medium">Check-In:</span> {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p><span className="font-medium">Check-Out:</span> {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p><span className="font-medium">Guests:</span> {booking.guests}</p>

                  <div className="mt-4 text-sm bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <p>₹{pricePerNight.toLocaleString("en-IN")} x {nights} night{nights > 1 ? "s" : ""}</p>
                      <p>₹{totalPrice.toLocaleString("en-IN")}</p>
                    </div>
                    <hr className="my-2 border-gray-300" />
                    <div className="flex justify-between font-semibold">
                      <p>Total:</p>
                      <p>₹{totalPrice.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingList;
