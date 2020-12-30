var express = require('express');
var router = express.Router();
var user_service = require('../service/user_service');

/* GET users listing. */
router.get('/login', function(req,res){
  res.render('login');
});

router.post('/login_process',function(req,res){
  var userId = req.body.user_id;
  var userPwd = req.body.password;
  var usersService = user_service.userService;
  setTimeout(async ()=>{
    var user_infomation = await usersService.loginUser(userId,userPwd).then();
    if(user_infomation === false){
      req.session.save(()=>{
        req.session.is_logined = false;
        res.redirect('/auth/login');
      });
    }
    else{
      req.session.save(()=>{
        req.session.is_logined = true;
        req.session.user_id = user_infomation.user_id;
        req.session.num_id = user_infomation.id;
        res.redirect('/');
      });
    }
  },1000);
});

router.get('/signup',(req,res)=>{
  res.render('signup');
});

router.post('/signup_process',(req,res)=>{
  var userId = req.body.user_id;
  var userPwd = req.body.password;
  var service = user_service.userService;
  setTimeout(async ()=>{
    await service.createUser(userId,userPwd).then()
    res.redirect('/');
  });
});

router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.clearCookie('session_cookie_name');
  res.redirect('/');
});

module.exports = router;
