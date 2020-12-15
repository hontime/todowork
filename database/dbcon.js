var mysql = require('mysql');

function db_connection(){
    var conn = mysql.createConnection({
        host : '172.18.0.2',
        port : 3306,
        user : 'root',
        password :'ss748201',
        database : 'todowork'
    });

    conn.connect();
    return conn;
}

exports.db_con = db_connection();