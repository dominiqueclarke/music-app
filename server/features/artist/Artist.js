const mongoose = require("mongoose");

const Artist = new mongoose.Schema({
  name: {type:String}
  , songPreviews: Array
  , fbID: {type:String}
  // , followers: [{type:mongoose.Schema.Types.ObjectId, ref: "Artists", unique:true}]
  // , shows: [{type:mongoose.Schema.Types.ObjectId, ref: "Shows", unique:true}]
});

module.exports = mongoose.model("Artist", Artist);
