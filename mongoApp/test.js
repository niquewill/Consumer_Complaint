//import express package
var express = require("express");
 
//import mongodb package
var mongodb = require("mongodb");
//MongoDB connection URL - mongodb://host:port/dbName
var dbHost = "mongodb://localhost:27017/fusion_demo";
     
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

function getData(){
      //use the find() API and pass an empty query object to retrieve all records
      dbObject.collection("fuel_price").find({}).toArray(function(err, docs){
        if ( err ) throw err;
        var monthArray = [];
        var petrolPrices = [];
        var dieselPrices = [];
     
        for ( index in docs){
          var doc = docs[index];
          //category array
          var month = doc['month'];
          //series 1 values array
          var petrol = doc['petrol'];
          //series 2 values array
          var diesel = doc['diesel'];
          monthArray.push({"label": month});
          petrolPrices.push({"value" : petrol});
          dieselPrices.push({"value" : diesel});
        }
     
        var dataset = [
          {
            "seriesname" : "Petrol Price",
            "data" : petrolPrices
          },
          {
            "seriesname" : "Diesel Price",
            "data": dieselPrices
          }
        ];
     
        var response = {
          "dataset" : dataset,
          "categories" : monthArray
        };
      });
    }

//create express app
var app = express();
app.get("/fuelPrices", function(req, res){
  getData(res);
});

app.listen("3300", function(){
  console.log('Server up: localhost:3300');
});