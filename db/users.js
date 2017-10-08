var records = [
    { id: 1, email: 'jack@wye.com', username: 'Jack', password: 'secret', displayName: 'Jack'}
  , { id: 2, email: 'jill@wye.com', username: 'Jill', displayName: 'Jill'}


User = require('./schemas/user');

exports.saveUser = function(email, password) {
  // create a new user
  var newUser = User({
    email: email,
    password: password,
    admin: false
  });

  // save the user
  newUser.save(function(err) {
    if (err) throw err;
    console.log('User created!');
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
