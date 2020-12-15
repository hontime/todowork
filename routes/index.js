var express = require('express');
var router = express.Router();
var todolist = require('../service/todo_list');
var todo_list = todolist.todoList;

/* GET home page. */
router.get('/', function(req, res, next) {
  todo_list.read_data().then((value)=>{
    res.render('index',{arrays:value});
  });
});

router.get('/signup',(req,res)=>{
  res.render('signup');
});

router.post('/signup',(req,res)=>{
  var userId = req.body.user_id;

  console.log(`User_ID : ${userId}`);
});


module.exports = router;
