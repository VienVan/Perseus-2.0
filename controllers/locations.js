var Location = require('../models/Location');


  function getAllLocations(req, res) {
      console.log('locations', req.body);
      Location.find(function(err, locations){
        if (err) res.json({message: err});
        res.json(locations);
      })
    };

  function addLocation(req, res) {
      console.log('req body', req.body);
      var newLocation = new TVShow(req.body);
      newLocation.save(function(err, location){
        if (err) res.json({message: err});
        console.log('created', location);
        res.json({location: location});
      })
  }

module.exports = {
    getAllLocations: getAllLocations,
    addLocation: addLocation
}
