var query = require('../query/index');
async function findBy(table, params,getValues='*' ) {
    var keyStr = '';
    let VALUES = [];
    for (key in params) {
        if (params[key]) {
            keyStr += key + '=? AND';
            VALUES.push(params[key]);
        }

    }
    keyStr = keyStr.replace(/AND$/, ' ');
    var sql = `SELECT ${getValues} FROM ${table} where  ${keyStr}`;
    return await query(sql,VALUES);
}
module.exports = {
    findBy: findBy
}