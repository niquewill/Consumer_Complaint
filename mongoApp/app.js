/* Mongoose's "Complaint Data" Project
 * =============================================== */

// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
     
//import mongodb package
var mongodb = require("mongodb");
var mongojs = require("mongojs");


// Save the URL of our database as well as the name of our collection
var databaseUrl = "dataCompdb";
var collections = ["logged_complaints"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);


//MongoDB connection URL - mongodb://host:port/dbName

//var dbHost = "mongodb://localhost/dataCompdb";
     
//Use the MongoClient to connect to the db as shown below:
//DB Object
//var dbObject;

//get instance of MongoClient to establish connection
//var MongoClient = mongodb.MongoClient;

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
//MongoClient.connect(dbHost, function(err, db){
//      if ( err ) throw err;
//      dbObject = db;
//    });

// implement the fetch db method to extract categories array as well as data set very easily.

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

function getData(){
      //use the find() API and pass an empty query object to retrieve all records
      db.logged_complaints.find({}).toArray(function(err, docs){
        if ( err ) throw err;
        var monthArray = [];
        var loggedComplaints = [];
        var resolvedComplaints = [];
     
        for ( index in docs) {
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
var app = express();
// Make public a static dir
app.use(express.static("public"));

// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.send("Hello world");
});


app.get("/loggedComplaints", function(req, res){
  getData(res);
});

// Listen on Port 3000
app.listen(3300, function() {
  console.log("App running on port 3300!");
});
