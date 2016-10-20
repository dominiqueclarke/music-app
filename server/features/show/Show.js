const mongoose = require("mongoose");

const Show = new mongoose.Schema({
  Artists: {type: Array, required:true}
  , dateObj: {type: Object, required:true}
  , jamBaseId: {type: Number, required: true}
  , TicketUrl: {type: String, required:true}
  , Venue: {type: Object, required:true}
});

module.exports = mongoose.model("Show", Show);
