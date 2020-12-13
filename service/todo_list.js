var db = require('../database/dbcon');

var conn = db.db_con;

class db_connection {
    create_data(todo,timer,color,create_date){
        conn.query(`insert into todo_list(id,todo,todo_color,todo_time,todo_create_date) values(0,${todo},${color},${timer},${create_date})`
        ,function(err,result){
            if(err) throw err;
            console.log("createQuery : "+result);
        });
    }

    read_data(){
        var result = {};
        conn.query("select * from todo_list", function(err,rows,fields){
            if(err) throw err;
            result = rows;
            // console.log(`result : ${result}`);
        });
        for(var i=0; i< result.langth; i++){
            console.log(`Result11 : ${result}`);
        }
    }

    update_data(){

    }

    delete_data(){

    }
}

module.exports = {
    db_conn:new db_connection()
}