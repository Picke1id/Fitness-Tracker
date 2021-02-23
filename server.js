// Setting Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Setting Port
const PORT = process.env.PORT || 3000;

// Creating Express Server
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Creating connection for database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Routes for API and HTML pages
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

// Event listener for starting server
app.listen(PORT, () => {
  console.log(`Your app is running on Port ${PORT}!`);
});