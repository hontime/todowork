var db = require('../database/dbcon');
var crypto = require("crypto");
const passport = require('passport');
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
    }

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
    })}
    // 중복되는 데이터베이 요청을 쿼리 데이터만 변경해서 데이터 를  출력해주는 함수;
    db_getData(sql){
        var result =[];
        return new Promise(function(resolve, reject){
            conn.query(sql,function(err,rows){
                if(err) reject(err);
                for(var i=0; i< rows.length; i++){
                    result.push(rows[i]);
                }
                resolve(result);
            });
        });
    }

    createUser(){
        try {
            var data = this.get_user(this.user_id).then((value)=>{
                // 회원가입시 아이디가 데이터베이스 와 비교후 있으면 0을 리턴
                if(this.user_id === value[0]){
                   return false;
                }
                else if(this.user_id !== value[0]){
                    hash.update(this.passwd);
                    var promise = (user_id,user_pwd,date_now)=> {return new Promise((resolve,reject)=>{
                        var ret_array = [];
                        var sql = `insert into users values(0,'${user_id}',"${user_pwd}",'${date_now}')`;
                        conn.query(sql,(err,rows)=>{
                            if(err) reject(err);
                            for(var i=0; i<rows.length; i++){
                                ret_array.push(rows[i]);
                            }
                            resolve();
                        });
                    })};
                    promise(this.user_id,hash.digest('hex'),date).then(console.log);
                    return true
                }
            });
            return data;
        } catch (err) {
            return err
        }
    }

    async loginUser(id,pwd){
        var sql = `SELECT * FROM users WHERE user_id='${id}'`;
        let result = await this.db_getData(sql).then();
        console.log("user ID : " +result[0].user_id);
    }
}

exports.userService =new UserService();