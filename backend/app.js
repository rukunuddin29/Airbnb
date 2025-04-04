const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/index");
const propertyRoutes = require("./routes/property");
const profileRoutes = require("./routes/profile");

dotenv.config();  // ✅ Load environment variables

const app = express();

// ✅ Middleware
app.use(express.json());

app.use(cors());


// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,                      // ✅ Use TLS for Atlas
  tlsAllowInvalidCertificates: true,  // ✅ For testing only (remove in production)
  serverSelectionTimeoutMS: 5000,     // Timeout limit
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log("❌ MongoDB Connection Error:", err));


// ✅ Routes
app.use("/", authRoutes);
app.use("/", homeRoutes);
app.use("/api/properties", propertyRoutes);  // Uncommented this
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;  // Use .env PORT or fallback to 5000
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
