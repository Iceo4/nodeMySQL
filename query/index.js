const mysql = require('mysql');
const config = require('../config/index');
const pool = mysql.createPool(config);

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, function (err, rows, fields) {
                    connection.release();
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                })
            }
        })
    });
}

module.exports = query;