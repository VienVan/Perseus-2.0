var User = require('../models/User');
var Location = require('../models/Location');
var auth = require('../resources/auth');

var usersController = {
  getUsers: function(req, res) {
    User.find({}, function(err, users) {
      err ? res.json({message: err}) : res.send(users)
    })
  },
  getUser : function(req, res) {
    User.findById(req.user), function(err, user) {
      res.send(user.populate('locationIds'));
    }
  },
  getLocations: function(req, res) {
    User.findById({_id: req.params.id}, function(err, user) {
      Location.find({_id: {$in: user.locationIds}}, function(err, locations) {
        res.send(locations);
      })
    })
  },
  addLocation: function(req, res) {
    User.findById({_id: req.params.id}, function(err, user) {
      console.log("lcoation body", req.body);
      var newLocation = new Location(req.body);
      newLocation.save(function(err, location) {
        if(err) {
          console.log("err", err)
        } else {
          user.locationIds.push(newLocation);
          user.save();
          res.send(location);
        }
      })
    })
  },
  currentUser: function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    })
  },
  addUser: function(req, res) {
    User.findById(req.user, function(err, user) {
      if(!user) {
        return res.status(400).send({message: err});
      }
      user.displayName = req.body.displayName || user.displayName;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.save(function(err) {
        err ? console.log(err) : res.send(user);
      })
    })
  },
  signUp: function(req, res) {
    User.findOne({email: req.body.email}, function(err, existingUser) {
      if (existingUser) {
      return res.status(409).send({ message: 'Email is already taken.' });
    }
    var user = new User({
      displayName: req.body.displayName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: auth.createJWT(result) });
    });
    })
  },
  logIn: function(req, res) {
    User.findOne({ email: req.body.email }, '+password', function (err, user) {
        if (!user) {
          return res.status(401).send({ message: 'Invalid email or password.' });
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({ message: 'Invalid email or password.' });
        }
        res.send({ token: auth.createJWT(user) });
        });
      });
  }
}



module.exports = usersController;
