var records = [
    { id: 1, email: 'jack@wye.com', username: 'Jack', password: 'secret', displayName: 'Jack'}
  , { id: 2, email: 'jill@wye.com', username: 'Jill', displayName: 'Jill'}
];

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
