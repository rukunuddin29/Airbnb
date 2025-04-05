const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  checkIn: Date,
  checkOut: Date,
  guests: Number
});

module.exports = mongoose.model("Booking", bookingSchema);
