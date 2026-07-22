const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Helloooo Kavinu!");
});

// Fake API route
app.get("/api/fake", async (req, res) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Fake API error:", error);

    res.status(500).json({
      message: "Failed to retrieve fake data",
    });
  }
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
