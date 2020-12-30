var db = require('../database/dbcon');
var conn = db.db_con;

var d = new Date(Date.now()),month = ''+(d.getMonth()+1),day = ''+d.getDate(),year = d.getFullYear();
if(month.length <2){
    month = '0' + month;
}
if(day.length <2){
    day = '0'+day;
}
var date = [year, month , day].join('-');

class TodoService{

    db_getData(query){
        var result = [];
        return new Promise(function(resolve,reject){
            conn.query(query,(err,rows)=>{
                if(err) reject(err);
                for(var i=0; i<rows.length; i++){
                    result.push(rows[i]);
                }
                resolve(result);
            });
        });
    }
    async Todo_all_list(){
        try {
            var sql = `select * from todo_list`;
            var search_data = await this.db_getData(sql).then();
            if(search_data[0] == null){
                return false;
            }
            else{
                return search_data;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_list_todo(user_id){
        try {
            var sql = `select * from todo_list where userid=${user_id}`;
            var search_data = await this.db_getData(sql).then();
            if(search_data[0] == null){
                return false;
            }
            else{
                return search_data;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_create_todo(todo,color,user_id){
        try {
            var sql = `insert into todo_list values(0,'${todo}','${color}','${date}','00:00:00','${user_id}')`;
            var data = await this.db_getData(sql).then()
            return data;
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_modify_todo(id){
        try {
            var sql = `select * from todo_list where id=${id}`;
            var getdata =await this.db_getData(sql).then();
            if(getdata !== null){
                console.log("getData : "+getdata);
                return getdata[0];
            }
            else{
                return false;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_update_todo(id,todo,color){
        try {
            var sql = `update todo_list set todo = '${todo}', color = '${color}' where id = ${id}`;
            var getdata =await this.db_getData(sql).then();
            if(getdata !== null){
                return true;
            }
            else{
                return false;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_delete_todo(todo_id){
        try {
            var sql = `select * from todo_list where id=${todo_id}`;
            var getdata = await this.db_getData(sql).then();
            if(getdata !== null){
                var sql = `DELETE from todo_list where id=${todo_id}`;
                await this.db_getData(sql).then();
                return true;
            }
            else{
                return false;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    // 스톱워치는 클라이언트 측에서 작동하고 기록을 서버에다가 데이터를 전송하는 형식

}

exports.todoService = new TodoService();