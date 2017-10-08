const debug = require('debug')('wye');

var records = [
    { id: 1, email: 'jack@wye.com', username: 'Jack', password: 'secret', displayName: 'Jack'}
  , { id: 2, email: 'jill@wye.com', username: 'Jill', displayName: 'Jill'}]

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

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByEmail = function(email, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.email === email) {
        return cb(null, record);
      }
    }
    return cb(null, null);
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

mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

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
