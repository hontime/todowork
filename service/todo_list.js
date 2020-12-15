var db = require('../database/dbcon');

var conn = db.db_con;

class DataBase{
    create_setData(todo,todo_color,todo_time){
        this.todo = todo;
        this.todo_color = todo_color;
        this.todo_time = todo_time;
    };

    read_promise = new Promise((resolve,reject)=>{
        var result = [];
        var sql = "select * from todo_list";
        conn.query(sql,(err,rows)=>{
            if(err)reject(err);
            for(var i=0; i< rows.length ; i++){
                result.push(rows[i])
            }
            resolve(result);
        });
    });
    async read_data(){
        try {
            return this.read_promise;
        } catch (err) {
            return err;
        }
    };
}

module.exports.DB =new DataBase();