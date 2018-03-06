var mysql = require('mysql');
var pool = mysql.createPool({
    // connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'macbook07',
    database: 'test'
});

var query = function (sql,option,callback) {
   
    if (!sql) {
        console.log('sql语句空');
        return;
    }
    pool.getConnection(function (err, conn) {
        
        if (err) {
            console.log('query2',err)
            return
        }

        conn.query(sql,option, function (error, results, fields) {
            //释放连接
            conn.release();
            if (error) {
                console.log('query3',error)
                console.log(error);
                return
            }
            
            //事件驱动回调
            callback(results);
        });
    });
}

module.exports = query;