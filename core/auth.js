/**
 * Created by romgar on 19/09/2017.
 */
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
module.exports = function(passport) {
    var Strategy = require('passport-local').Strategy;
    var db = require('../db');

    passport.use(new Strategy({
            usernameField: 'email'
        },
        function (email, password, cb) {
            db.users.checkLoginAndPassword(email, password, function (err, user) {
                debugger;
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    return cb(null, false);
                }
                return cb(null, user);
            });
        }));


    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        db.users.findByMongoId(id, function (err, user) {
            if (err) {
                return cb(err);
            }
            cb(null, user);
        });
    });
};
