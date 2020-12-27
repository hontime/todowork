var db = require('../database/dbcon');
var crypto = require("crypto");
const passport = require('passport');
var hash = crypto.createHash('sha512-256');
var hash2 = crypto.createHash('sha512WithRSAEncryption');
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
    async createUser(id,pwd){
        try {
            var get_sql = `select user_id from users where user_id = '${id}'`;
            var getUser = await this.db_getData(get_sql).then();
            if(getUser[0] !== undefined){
                console.log('아이디가 있습니다. 다시시도해주세요');
                return false;
            }
            else{
                var paswd = hash.update(pwd).digest("hex");
                hash2.update(paswd);
                var create_sql = `insert into users values(0, '${id}','${hash2.digest("hex")}','${date}')`;
                var result = await this.db_getData(create_sql).then();
                console.log("result : " +result);
                return true;
            }
        } catch (error) {
            console.log("Create Error : "+error);
        }
    }

    async loginUser(id,pwd){
        try {
            var sql = `SELECT * FROM users WHERE user_id='${id}'`;
            let result = await this.db_getData(sql).then();
            if(result[0] !== undefined){
                var getid = result[0].user_id;
                var getpwd = result[0].user_password;

                // 유저가 입력한 아이디 비번 비교 
                var upPWD = hash.update(pwd).digest("hex");
                var hex2PWD = hash2.update(upPWD).digest("hex");
                if(getid === id && getpwd === hex2PWD){
                    console.log(`입력한 ID : ${id} , 패스워드 : ${hex2PWD}`);
                    console.log(`데이터베이스 가져온 ID : ${getid} , 패스워드 : ${getpwd}`);
                    return result[0];
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