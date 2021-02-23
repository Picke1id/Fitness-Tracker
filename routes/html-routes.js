// Setting Dependencies
const router = require("express").Router();
const path = require("path");

// Method to Display Exercise Page
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// Method to Display Stats Page
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// Exporting to server.js file
module.exports = router;