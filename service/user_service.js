var db = require('../database/dbcon');
var crypto = require("crypto");
const { S_IFCHR } = require('constants');
var hash = crypto.createHash('sha512-256');
var conn = db.db_con;

var d = new Date(Date.now()),month = ''+(d.getMonth()+1),day = ''+d.getDate(),year = d.getFullYear();
if(month.length <2){
    month = '0' + month;
}
if(day.length <2){
    day = '0'+day;
}
var date = [year, month , day].join('-');

class UserService{
    setUser(userId, password){
        this.user_id = userId;
        this.passwd = password;
    };

    get_user =(user_Id) => {return new Promise ((resolve,reject)=>{
        var sql = `SELECT user_id FROM users WHERE user_id = '${user_Id}'`;
        var result = []
        conn.query(sql, (err,rows)=>{
            if(err) reject(err);
            for(var i=0; i< rows.length; i++){
                result.push(rows[i].user_id);
            }
            resolve(result);
        });
    })};

    createUser(){
        try {
            var data = this.get_user(this.user_id).then((value)=>{
                // 회원가입시 아이디가 데이터베이스 와 비교후 있으면 0을 리턴
                if(this.user_id == value[0]){
                   return 0;
                }
                // 데이터베이스에 아이디가 없으니 1을 리턴함
                else if(this.user_id != value[0]){
                    hash.update(this.passwd);
                    var result = [];
                    var promise = (user_id,user_pwd,date_now)=> {return new Promise((resolve,reject)=>{
                        var sql = `insert into users values(0,'${user_id}',"${user_pwd}",'${date_now}')`;
                        conn.query(sql,(err,rows)=>{
                            if(err) reject(err);
                            console.log(rows);
                            for(var i=0; i<rows.length; i++){
                                result.push(rows[i]);
                            }
                            resolve(result);
                        });
                    })};
                    promise(this.user_id,hash.digest('hex'),date).then(console.log);
                }
            });
            return data;
            // conn.query('insert into ')
        } catch (err) {
            return err
        }
    }
}

exports.userService =new UserService();