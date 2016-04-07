var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = './User';

var LocationSchema = mongoose.Schema({
	name: String,
	loc: {
		type: [Number], //[<longtitude>, <Latitude>] long first
		index: '2d'
	},
	description: String,
	url: String
});

module.exports = mongoose.model('Location', LocationSchema);
