// Require mongoose
var mongoose = require("mongoose");

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

// Create a UserSchema with the Schema class
var UserSchema = new Schema({
  // name: a unique String
  firstname: {
    type: String,
    unique: true
  },
  lastname: {
    type: String,
    unique: true
  },
  useremail: {
    type: String,
    unique: true
  },
  logintime: {
    type: Date
  },
  useraddress: {
    type: String
  },
  // complaints property for the user
  complaints: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Complaint model
    ref: "Complaint"
  }]
});

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the user model
module.exports = User;
