var express = require('express');
var router = express.Router();
var todolist = require('../service/todo_list');
var todo_list = todolist.todoList;

/* GET home page. */
router.get('/', function(req, res) {
  req.session.authId = "세션 아이디이다";
  req.session.save(function(){
    todo_list.read_data().then((value)=>{
      res.render('index',{arrays:value});
    });
  });
});

router.get('/test',function(req,res){
  console.log("test : "+req.session.authId);
  res.send(req.session.authId);
  // res.render('timer');
});

module.exports = router;
