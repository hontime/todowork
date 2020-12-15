var express = require('express');
var router = express.Router();
var todolist = require('../service/todo_list');
var data = todolist.DB;

/* GET home page. */
router.get('/', function(req, res, next) {
  data.read_data().then((value)=>{
    res.render('index',{arrays:value});
  });
});


module.exports = router;
