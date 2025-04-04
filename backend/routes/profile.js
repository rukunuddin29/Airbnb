const express = require("express");
const User = require("../models/user-model");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get user profile by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

module.exports = router;
