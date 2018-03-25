var query = require('../query/index');
// 自动判断插入或者更新
async function updateUser(params, uniqueKey = 'openid') {

    var keyStr = '',
        valuesStr = '',
        updateStr = '';
    let VALUES = [];
    for (key in params) {
        if (params[key]) {
            keyStr += key + ',';
            valuesStr += '?,';
            VALUES.push(params[key]);
            if (key != uniqueKey) {
                updateStr += ` ${key} = VALUES (${key}),`
            }
        }

    }
    keyStr = keyStr.replace(/,$/, '');
    valuesStr = valuesStr.replace(/,$/, '');
    updateStr = updateStr.replace(/,$/, '');
    var sql = `INSERT INTO user (${keyStr}) VALUES (${valuesStr}) ON DUPLICATE KEY UPDATE ${updateStr}`;
    await query(sql,VALUES);
}

module.exports = {
    updateUser: updateUser
}