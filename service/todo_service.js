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
        console.log(query);
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

    async search_todoList(user_id,todo_id){
        try {
            var search_todo = `select * from todo_list where userid=${user_id} && id = ${todo_id} `;
            var search_data = await this.db_getData(search_todo).then();
            if(search_data[0] == null){
                return false;
            }
            else{
                return true;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_create_todo(todo,color,user_id){
        try {
            var sql = `insert into todo_list values(0,'${todo}','${color}','${date}','00:00:00',${user_id})`;
            var data= await this.db_getData(sql).then()
            return data;
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_update_todo(todo,color,user_id,todo_id){
        try {
            var searchData = await this.search_todoList(user_id,todo_id).then()
            if(searchData){
                var sql = `UPDATE todo_list SET todo='${todo}', color='${color}' WHERE userid=${user_id} && id=${todo_id}`;
                await this.db_getData(sql).then();
                return "업데이트 성공했습니다.";
            }
            else{
                return "업데이트를 실패했습니다.";
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async Today_delete_todo(user_id,todo_id){
        try {
            var searchData = await this.search_todoList(user_id,todo_id).then()
            console.log("search Data: " +searchData);
            if(searchData){
                var sql = `DELETE from todo_list where userid=${user_id} && id=${todo_id}`;
                await this.db_getData(sql).then();
                return "삭제 성공했습니다.";
            }
            else{
                return "삭제 실패했습니다.";
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    // 스톱워치는 클라이언트 측에서 작동하고 기록을 서버에다가 데이터를 전송하는 형식

}

exports.todoService = new TodoService();