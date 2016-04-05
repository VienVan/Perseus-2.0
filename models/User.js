var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs');

var UserSchema = mongoose.Schema({
  created: { type: Date },
  updated: { type: Date },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  username: { type: String },
  picture: String
});

UserSchema.pre('save', function (next) {
  // set created and updated
  now = new Date();
  this.updated = now;
  if (!this.created) {
    this.created = now;
  }

  // encrypt password
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
