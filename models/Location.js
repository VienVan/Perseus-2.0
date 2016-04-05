var mongoose = require('mongoose');

var LocationSchema = mongoose.Schema({
	name: String,
	loc: {
		type: [Number], //[<longtitude>, <Latitude>] long first
		index: '2d'
	},
	description: String,
	snapshot: String
});

module.exports = mongoose.model('Location', LocationSchema);
