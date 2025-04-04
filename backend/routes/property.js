const express = require("express");
const Property = require("../models/property-models");
const authMiddleware = require("../middleware/authMiddleware");  // Authentication middleware
const router = express.Router();

// ➤ POST: Add a new property (Logged-in users can add properties)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProperty = new Property({
      ...req.body,
      userId: req.user.id  // Attach the logged-in user's ID to the property
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to add property" });
  }
});

// ➤ GET: Fetch all properties (Anyone can view all properties)
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();  // No auth required
    res.json(properties);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to get properties" });
  }
});

// ➤ GET: Fetch only the current host's properties
router.get("/my-properties", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ userId: req.user.id });  // Only show host's own properties
    res.json(properties);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to get your properties" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const propertyId = req.params.id;

    // Find the property by ID
    const property = await Property.findOne({ _id: propertyId });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Ensure only the owner can delete
    if (property.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this property" });
    }

    // Delete the property
    await Property.findOneAndDelete({ _id: propertyId });

    res.status(200).json({ message: "Property deleted successfully" });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Failed to delete property" });
  }
});


module.exports = router;
