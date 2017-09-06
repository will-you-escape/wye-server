var express = require('express');
var connectEnsureLogin = require('connect-ensure-login');
var router = express.Router();

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/profile',
  connectEnsureLogin.ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
