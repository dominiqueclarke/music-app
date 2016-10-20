const mongoose = require("mongoose");

const User = new mongoose.Schema({
  fullName: {type:String, required: true}
  , firstName: {type:String, required: true}
  , lastName: {type:String, require:true}
  , zipCode: String
  , fbID: {type:String}
  , artistsFollowing:[{type:mongoose.Schema.Types.ObjectId, ref: "Artists", unique:true}]
  , usersFollowing: {type:Array}
  , savedShows: [{type:mongoose.Schema.Types.ObjectId, ref: "Show", unique:true}]
  , lastShowsRequest: Date
});

module.exports = mongoose.model("User", User);
