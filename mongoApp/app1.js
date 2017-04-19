//import express package
var express = require("express");

//import mongodb package
var mongodb = require("mongodb");

//MongoDB connection URL - mongodb://host:port/dbName
var dbHost = "mongodb://localhost:27017/dataCompdb";

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

function getData(responseObj){
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
    responseObj.json(response);
  });
}

//create express app
var app1 = express();

//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app1.engine('handlebars', exphbs({defaultLayout: 'main'}));
app1.set('view engine', 'handlebars');

//Defining middleware to serve static files
app1.use('/public/public', express.static('public'));
app1.get("/loggedComplaints", function(req, res){
  getData(res);
});
app1.get("/", function(req, res){
  res.render("chart");
});

app1.listen("3300", function(){
  console.log('Server up: http://localhost:3300');
});

module.exports = app1;