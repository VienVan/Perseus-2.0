var Location = require('../models/Location');
var User = require('../models/User');

var locationsController = {
  index: function(req, res) {
    Location.find({}, function(err, locations) {
      err ? res.json({message: err}) : res.json(locations)
    })
  },
  createLocation: function(req, res) {
    console.log("location body", req.body);
  //   User.findById({_id: req.params.id}, function(err, user) {
  //     var newLocation = new Location(req.body);
  //     newLocation.save(function(err, location) {
  //       if(err) {
  //         console.log("err", err)
  //       } else {
  //         user.locationIds.push(newLocation);
  //         user.save();
  //         res.send(location);
  //       }
  //     })
  //   })
  }
}

module.exports = locationsController;
