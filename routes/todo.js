var express = require('express');
var router = express.Router();
var todo_service = require('../service/todo_service');

var todoService = todo_service.todoService;
/* GET home page. */
router.get('/', function(req, res) {
  if(req.session.user_id !== undefined){
    var num_id = req.session.num_id;
    setTimeout(async ()=>{
    var data = await todoService.Today_list_todo(num_id);
    res.render("todo_list",{"arrays":data});
    },1000);
  }
  else{
    req.session.error = "true";
    res.redirect('/');
  }
});

router.post('/modify',function(req,res){
  var id = req.body.num_id;
  console.log("req.id : "+id);
  setTimeout(async ()=>{
    var data = await todoService.Today_modify_todo(id);
    res.render('todo_modify',{"data":data});
  },1000);
});

router.post('/update',(req,res)=>{
  var color = req.body.color;
  var id = req.body.id;
  var todo = req.body.todo;
  setTimeout(async ()=>{
    await todoService.Today_update_todo(id,todo,color);
    res.redirect('/todo');
  },1000);
})

router.post('/delete',(req,res)=>{
  var id = req.body.num_id;
  setTimeout(async ()=>{
    await todoService.Today_delete_todo(id)
    res.redirect('/todo');
  });
});

router.get('/create',(req,res)=>{
  res.render('todo_add');
});

router.post('/create_process',(req,res)=>{
  var num_id = req.session.num_id;
  var todo = req.body.todo;
  var color = req.body.color;
  setTimeout(async ()=>{
    await todoService.Today_create_todo(todo,color,num_id);
    res.redirect('/todo');
  });
});
module.exports = router;
