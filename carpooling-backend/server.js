const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { connectDB, sequelize } = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./src/routes/authRoutes");


// Connect to PostgreSQL
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
// Routes
app.get("/", (req, res) => {
  res.send("Carpooling API is running!");
});

// Sync Sequelize models & Start server
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
