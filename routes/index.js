var express = require('express');
var router = express.Router();
var db = require("../database/dbcon");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello Welcome To Node JS");
  // res.render('index', { title: 'Express' });
});

router.get("/dd",(req,res)=>{
  var conn = db.db_con;
  conn.query("Select * from todo_list",function(err,result,fields){
    if(err){
      console.log("Query Error");
    }
    res.render('index',{rows:result});
  });
});

module.exports = router;
