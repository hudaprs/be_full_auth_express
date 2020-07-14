const express = require("express");
const app = express();
const connectToMongoDB = require("./config/db");

// Accept incoming request
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/password", require("./routes/api/forgotPassword"));

// Run the server
app.listen(5000, () => console.log(`Server running in 5000`));
