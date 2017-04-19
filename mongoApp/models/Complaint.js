// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create a ComplaintSchema with the Schema class
var ComplaintSchema = new Schema({
  // name: a unique String
  companyname: {
    type: String
  },
  productname: {
    type: String
  },
  complainttitle: {
    type: String
  },
  complaintinput: {
    type: String
  }
});

// Create the Complaint model with the ComplaintSchema
var Complaint = mongoose.model("Complaint", ComplaintSchema);

// Export the user model
module.exports = Complaint;
