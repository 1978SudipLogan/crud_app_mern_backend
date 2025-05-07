const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://unique-sprite-adde1d.netlify.app',
  credentials: true
}));

// Routes
app.use("/api", userRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
