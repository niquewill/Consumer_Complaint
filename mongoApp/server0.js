/* Mongoose's "Complaint Data" Project
 * =============================================== */
var express = require("express");

// Bring in our apps Complaint and User
var Complaint = require("./app0.js");
var User = require("./app1.js");

// Initialize Express
var app = express();


// Listen on Port 8000
app.listen(8000, function() {
  console.log("App running on port 8000!");
});
