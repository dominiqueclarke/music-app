const mongoose = require("mongoose");

const Show = new mongoose.Schema({
	Artists: {
		type: Array,
		required: true
	},
	Date: {
		type: String,
		required: true
	},
	dateObj: {
		type: Object,
		required: true
	},
	epochTime: {
		type: Number,
		required: true
	},
	jamBaseId: {
		type: Number,
		required: true
	},
	TicketUrl: {
		type: String
	},
	Venue: {
		type: Object,
		required: true
	}
});

module.exports = mongoose.model("Show", Show);