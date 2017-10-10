const debug = require('debug')('wye');
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

User = require('./schemas/user');

exports.saveUser = function(email, password, cb) {
  // create a new user
  var newUser = User({
    email: email,
    password: password,
    admin: false
  });
  debug('trying to save new user');
  // save the user
  newUser.save(function(err) {
    if (err) {
      debug('error when saving new user');
      throw err;
    }
    debug('User created!');
    cb(this);
  });
}

exports.checkLoginAndPassword = function(email, password, cb) {
  debug('checkLoginAndPassword');
  process.nextTick(function() {
    User.findOne({ 'email': email, 'password': password }, 'id username email', function (err, user) {
      debug('checkLoginAndPassword.findOne');
      if (err) return handleError(err);
      cb(null, user);
    });
  });
}


exports.findByMongoId = function(id, cb) {
  process.nextTick(function() {
    User.findOne({ '_id': ObjectId(id)}, 'id username email', function (err, user) {
      debug('checkLoginAndPassword.findByMongoId');
      if (err) return handleError(err);
      if (!user)
        cb(new Error('User ' + id + ' does not exist'));
      cb(null, user);
    });
  });
}
