var express = require('express');
const { render } = require('../app');
var router = express.Router();
var user_service = require('../service/user_service');

/* GET users listing. */
router.get('/login', function(req,res){
  res.render('login');
});

router.post('/login_process',function(req,res){
  var userId = req.body.user_id;
  var userPwd = req.body.password;
  var users = user_service.userService;
  users.loginUser(userId,userPwd);
});

router.get('/signup',(req,res)=>{
  res.render('signup');
});

router.post('/signup_process',(req,res)=>{
  var userId = req.body.user_id;
  var userPwd = req.body.password;
  var service = user_service.userService;
  service.setUser(userId,userPwd);
  service.createUser().then()
  res.redirect('/');
});

module.exports = router;
