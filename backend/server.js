require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const crackRoutes = require("./routes/crackRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const PORT = process.env.PORT || 5000;

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", crackRoutes);
app.get("/", (req, res) => res.send("Welcome to Crack Detection API"));

// Error Handling Middleware (should be placed after routes)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
