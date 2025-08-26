require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const widgetRoutes = require("./routes/widgetRoutes");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/widgets", widgetRoutes);

app.get("/", (req, res) => {
  res.send("Backend works! Use /widgets for the API.");
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

const weatherRoutes = require("./routes/weatherRoutes");
app.use("/widgets/weather", weatherRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

module.exports = app;
