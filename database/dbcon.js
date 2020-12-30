var mysql = require('mysql');
// var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);

// var options = {
//     host:'172.18.0.4',
//     port:3306,
//     user:'root',
//     password:'ss748201',
//     database:'todowork'
// };
// var sessionStore = new MySQLStore(options);

function db_connection(){
    var conn = mysql.createConnection({
        host : '172.18.0.4',
        // host : '127.0.0.1',
        // host : 'localhost',
        port : 3306,
        user : 'root',
        password :'ss748201',
        database : 'todowork'
    });

    conn.connect();
    return conn;
}

exports.db_con = db_connection();
// exports.store = sessionStore;