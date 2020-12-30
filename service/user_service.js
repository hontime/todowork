var db = require('../database/dbcon');
var crypto = require("crypto");
const passport = require('passport');
var conn = db.db_con;

var d = new Date(Date.now()),month = (d.getMonth()+1),day = d.getDate(),year = d.getFullYear();
if(month.length <2){
    month = '0' + month;
}
if(day.length <2){
    day = '0'+day;
}
var date = [year, month , day].join('-');

class UserService{

    getHash(){
        var hash = crypto.createHash('sha512-256');
        return hash;
    }
    // 중복되는 데이터베이 요청을 쿼리 데이터만 변경해서 데이터를 출력해주는 함수;
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
    async createUser(id,pwd){
        var hash = this.getHash();
        try {
            var get_sql = `select user_id from users where user_id = '${id}'`;
            var getUser = await this.db_getData(get_sql).then();
            if(getUser[0] !== undefined){
                console.log('아이디가 있습니다. 다시시도해주세요');
                return false;
            }
            else{
                hash.update(pwd)
                var hashPWD = hash.copy().digest("hex");
                var create_sql = `insert into users values(0, '${id}','${hashPWD}','${date}')`;
                var result = await this.db_getData(create_sql).then();
                if(result){
                    return true;
                }
                else{
                    return false;
                }
            }
        } catch (error) {
            console.log("Create Error : "+error);
        }
    }

    async loginUser(id,pwd){
        var hash = this.getHash();
        try {
            var sql = `SELECT * FROM users WHERE user_id='${id}'`;
            let result = await this.db_getData(sql).then();
            if(result[0] !== undefined){
                var getid = result[0].user_id;
                var getpwd = result[0].user_password;

                // 유저가 입력한 아이디 비번 비교 
                hash.update(pwd);
                var hashPWD = hash.copy().digest("hex");
                if(getid === id && getpwd === hashPWD){
                    console.log(result[0].id);
                    var data = {"id":result[0].id,"user_id":result[0].user_id};
                    return data;
                }
                else{
                    console.log("값이 다르다 아이디 또는 비밀번호가");
                    return false;
                }
            }
            else{
                console.log("아이디가 또는 비밀번호가 틀렸습니다.");
                return false;
            }
        } catch (error) {
            console.log("error : "+error);
        }
    }
}

exports.userService =new UserService();