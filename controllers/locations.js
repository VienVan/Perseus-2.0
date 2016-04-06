var Location = require('../models/Location');
var User = require('../models/User');

var locationsController = {
  index: function(req, res) {
    Location.find({}, function(err, locations) {
      err ? res.json({message: err}) : res.json(locations)
    })
  }
}

module.exports = locationsController;
