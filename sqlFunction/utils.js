var query = require('../query/index');
async function findBy(table, params,getValues='*' ) {
    var keyStr = '';
    let VALUES = [];
    for (key in params) {
        if (params[key]) {
            keyStr += ' '+` ${key} =? AND`;
            VALUES.push(params[key]);
        }

    }
    keyStr = keyStr.replace(/AND$/, '');
    var sql = `SELECT ${getValues} FROM ${table} where  ${keyStr}`;
    return  query(sql,VALUES);
}
async function insertObj(table, params){
    console.log(params,1223)
    var keyStr = '',
    valuesStr = '';
    let VALUES = [];
    for (key in params) {
        if (params[key]) {
            keyStr +=  `${key},`;
            valuesStr += '?,';
            VALUES.push(params[key]);
        }

    }
    keyStr = keyStr.replace(/,$/, '');
    valuesStr = valuesStr.replace(/,$/, '');
    
    var sql = `INSERT INTO ${table} (${keyStr}) VALUES (${valuesStr})`;
    console.log(sql,111,VALUES)
    await query(sql,VALUES);
    
}
module.exports = {
    findBy: findBy,
    insertObj:insertObj
}