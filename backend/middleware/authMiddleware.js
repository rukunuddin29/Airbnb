const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token

    if (!token) {
        console.log("❌ No Token Provided");
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Verified User:", verified);
        req.user = verified;
        next();
    } catch (error) {
        console.log("❌ JWT Error:", error.message);
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
