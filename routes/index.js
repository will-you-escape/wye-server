var express = require('express');
var router = express.Router();
var passport = require('passport');

var db = require('../db/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Will you escape', req: req, activeMenu: 'index' });
});


/* Add authentication */
router.get('/login/',
  function(req, res){
    res.render('login');
  }
);

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login'}
  ),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

router.get('/create-account',
  function(req, res) {
    res.render('account-creation');
  }
);

router.post('create-account',
  function(req, res) {
    db.users.saveUser(req.query['email'], req.query['password']);
  }
);

module.exports = router;
