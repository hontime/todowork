var mysql = require('mysql');

function db_connection(){
    var conn = mysql.createConnection({
        host : 'localhost',
        port : 3306,
        user : 'root',
        password :'ss748201',
        database : 'todowork'
    });

    conn.connect();
    return conn;
}

exports.db_con = db_connection();