require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');

var app = express();

app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

/* Passport initialization should happen before the routing declaration
app.router is included at the end of the middleware stack at the time that
you declare routes.
If you then use() more middleware after that, that middleware comes
after app.router. The upshot is that passport.initialize() needs to come before app.router,
so its recommended to configure your app before declaring routes.
https://github.com/jaredhanson/passport/issues/51
*/
app.use(passport.initialize());
app.use(passport.session());

var index = require('./routes/index');
var users = require('./routes/users');
var rooms = require('./routes/rooms');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/rooms', rooms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

require('./core/auth.js')(passport);

module.exports = app;
