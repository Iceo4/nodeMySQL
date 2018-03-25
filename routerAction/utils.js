var request = require('request');

function fetchApi(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) {
                reject({
                    code: -1,
                    msg: '服务器发送请求错误',
                    data: []
                })
            } else {
                resolve(body)
            }
        });
    })
}

module.exports = {
    fetchApi:fetchApi
}