const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

// Routes
const skillRoutes = require("./routes/skills");
app.use("/api/skills", skillRoutes);

// Serve static frontend
const clientPath = path.join(__dirname, "../client");

app.use(express.static(clientPath));

// Serve index.html only if it exists
app.get("*", (req, res) => {
  const indexPath = path.join(clientPath, "index.html");
  res.sendFile(indexPath, err => {
    if (err) {
      res.status(500).send("Frontend not found");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
