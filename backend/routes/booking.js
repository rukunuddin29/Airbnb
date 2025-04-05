const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/booking-models")  // You'll need this model

// POST: Book a property
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;

    const newBooking = new Booking({
      userId: req.user.id,
      propertyId,
      checkIn,
      checkOut,
      guests
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
});
// GET /api/bookings/:id - fetch specific booking details
// Get all bookings for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
      const bookings = await Booking.find({ userId: req.user.id }).populate("propertyId");
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  
  

module.exports = router;
