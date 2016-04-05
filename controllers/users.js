var User = require('../models/user');
var auth = require('../resources/auth');

function getUser(req, res){
  User.findById(req.user, function(err, user){
    res.send(user);
  })
};

function addUser(req, res){
  User.findById(req.user, function (err, user){
    if (!user) {
      return res.status(400).send({message: 'User not found.'});
    }
    user.displayName = req.body.displayName || user.displayName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save(function(err){
      res.send(user);
    });
  });
};

function signUp(req, res){
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
};

function logIn(req, res){
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
      console.log('log in user', user)
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

module.exports = {
  getUser: getUser,
  addUser: addUser,
  signUp: signUp,
  logIn: logIn
}
