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
                if(err){
                    console.log("err 발생 : "+err);
                    reject(err);
                }
                else{
                    for(var i=0; i< rows.length; i++){
                        result.push(rows[i]);
                    }
                    resolve(result);
                }
            });
        });
    }
    async createUser(id,pwd){
        try {
            var get_sql = `select user_id from users where user_id = '${id}'`;
            var getUser = await this.db_getData(get_sql).then(value=>{return value});
            // console.log("getUser : "+getUser[0])
            // console.log("111111111")
            if(getUser[0] !== undefined){
                // console.log("222222222")
                console.log('아이디가 있습니다. 다시시도해주세요');
                return false;
            }
            else{
                // console.log("333333333")
                hash.update(pwd);
                var create_sql = `insert into users values(0, '${id}','${hash.digest("hex")}','${date}')`;
                var result = await this.db_getData(create_sql).then(value =>{return value});
                console.log("result : " +result);
                return true;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }

    async loginUser(id,pwd){
        var sql = `SELECT * FROM users WHERE user_id='${id}'`;
        let result = await this.db_getData(sql).then();
        console.log("user ID : " +result[0].user_id + " && user PWD : "+result[0].user_password);
    }
}

exports.userService =new UserService();