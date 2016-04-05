var Location = require('../models/Location');


var locationsController = {
  index: function(req, res) {
    Location.find({}, function(err, locations) {
      err ? res.json({message: err}) : res.json(locations)
    })
  },
  createLocation: function(req, res) {
    var id = res.params.id;
      var newLocation = new Location(req.body);
      newLocation.userId = id;
      newLocation.save(function(err, location) {
        err ? res.json({message: err}) : res.json({location: location})
      })
  }
}

module.exports = locationsController;
