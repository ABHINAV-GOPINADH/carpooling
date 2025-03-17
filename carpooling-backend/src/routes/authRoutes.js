const express = require("express");
const multer = require("multer");
const path = require("path");
const  User  = require("../models/User");

const router = express.Router();

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage });

// Registration Route with File Upload
router.post("/register", upload.single("profilePhoto"), async (req, res) => {
  try {
    const { fullName, email, password, gender } = req.body;
    const profilePhoto = req.file ? req.file.filename : null; // Check if file exists
    

    // Save user to database (Sequelize example)
    const newUser = await User.create({
      fullName,
      email,
      password, // Make sure to hash this before saving in a real app
      profilePhoto,
      gender,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
