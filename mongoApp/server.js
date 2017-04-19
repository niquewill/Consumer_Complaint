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
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/consumerCompdb");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//MongoDB connection URL - mongodb://host:port/dbName

var dbHost = "mongodb://localhost/dataCompdb";
     
//Use the MongoClient to connect to the db as shown below:
//DB Object
var dbObject;
     
//get instance of MongoClient to establish connection
var MongoClient = mongodb.MongoClient;
     
//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
MongoClient.connect(dbHost, function(err, db){
      if ( err ) throw err;
      dbObject = db;
    });

// implement the fetch db method to extract categories array as well as data set very easily.
function getData(){
      //use the find() API and pass an empty query object to retrieve all records
      dbObject.collection("logged_complaints").find({}).toArray(function(err, docs){
        if ( err ) throw err;
        var monthArray = [];
        var loggedComplaints = [];
        var resolvedComplaints = [];
     
        for ( index in docs){
          var doc = docs[index];
          //category array
          var month = doc['month'];
          //series 1 values array
          var logged = doc['Logged Complaints'];
          //series 2 values array
          var resolved = doc['Resolved Complaints'];
          monthArray.push({"label": month});
          loggedComplaints.push({"value" : logged});
          resolvedComplaints.push({"value" : resolved});
        }
     
        var dataset = [
          {
            "seriesname" : "Logged Complaints",
            "data" : loggedComplaints
          },
          {
            "seriesname" : "Resolved Complaints",
            "data": resolvedComplaints
          }
        ];
     
        var response = {
          "dataset" : dataset,
          "categories" : monthArray
        };
      });
    }

//create express app and get logged complaints for charting
//var app = express();
app.get("/loggedComplaints", function(request, response){
  getData(response);
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
app.get("/complaints", function(req, res) {
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
app.get("/user", function(req, res) {
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
app.post("/submit", function(req, res) {
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
app.get("/populateduser", function(req, res) {
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

// Listen on Port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
