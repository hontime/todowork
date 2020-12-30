var express = require('express');
var router = express.Router();
var todolist = require('../service/todo_service');
var todoService = todolist.todoService;

/* GET home page. */
router.get('/', function(req, res) {
  var user_id = req.session.user_id;
  todoService.Todo_all_list().then((value)=>{
    res.render('index',{arrays:value,user_id:user_id});
  });
});

module.exports = router;
