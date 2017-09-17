var express = require('express');
var router = express.Router();
var passport = require('passport'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Will you escape', req: req });
});


/* Add authentication */
router.get('/login/',
  function(req, res){
    res.render('login');
  }
);

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
    successFlash: 'Welcome!'}
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


module.exports = router;
