var express = require('express');
var connectEnsureLogin = require('connect-ensure-login');
var router = express.Router();

router.get('/profile',
  connectEnsureLogin.ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
