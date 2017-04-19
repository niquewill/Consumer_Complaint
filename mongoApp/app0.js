/* Mongoose's "Complaint Data" Project
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//import mongodb package
var mongodb = require("mongodb");

// Bring in our Models: Complaint and User
var Complaint = require("./models/Complaint.js");
var User = require("./models/User.js");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app0 = express();

// Use morgan and body parser with our app
app0.use(logger("dev"));
app0.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app0.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/consumerCompdb");
var db = mongoose.connection;
// ------------------------------------------------

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});
// We'll create a new user by using the User model as a class
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
var exampleUser = new User({
  firstname: "Ernest",
  lastname: "Hemingway",
  useremail: "earnestH@Js.com",
  logintime: "04/09/2017 12:00 AM",
  useraddress: "11111 Katy Fwy, Houston, TX 77079"
});
// Using the save method in mongoose, we create our example user in the db
exampleUser.save(function(error, doc) {
  // Log any errors
  if (error) {
    console.log(error);
  }
  // Or log the doc
  else {
    console.log(doc);
  }
});

// Routes
// ======

// Route to see complaints added
app0.get("/complaints", function(req, res) {
  // Find all complaints in the complaint collection with our Complaint model
  Complaint.find({}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});


// Route to see what user looks like without populating
app0.get("/user", function(req, res) {
  // Find all users in the user collection with our User model
  User.find({}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Or send the doc to the browser
    else {
      res.send(doc);
    } 
  });
});

// New complaint creation via POST route
app0.post("/submit", function(req, res) {
  // Use our Complaint model to make a new complaint from the req.body
  var newComplaint = new Complaint(req.complaintinput);
  // Save the new complaint to mongoose
  newComplaint.save(function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.send(error);
    }
    // Otherwise
    else {
      // Find our user and push the new complaint id into the User's compalints array
      User.findOneAndUpdate({}, { $push: {"complaints": doc._id } }, { new: true }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          res.send(newdoc);
        }
      });
    }
  });
});

// Route to see what user looks like WITH populating
app0.get("/populateduser", function(req, res) {
  // Prepare a query to find all users..
  User.find({})
    // ..and on top of that, populate the complaints (replace the objectIds in the complaints array with bona-fide complaints)
    .populate("complaints")
    // Now, execute the query
    .exec(function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // Or send the doc to the browser
      else {
        res.send(doc);
      }
    });
});

 Listen on Port 3000
app0.listen(3000, function() {
  console.log("App0 running on port 3000!");
});

module.exports = app0;