var query = require('../../query/index');
var jwt = require('jsonwebtoken');
var _key = require('../../config/secret');
var request = require('request');
const APPID = 'wx3ce22d4f5afb322b',
    APP_SECRET = '87f8306c5370ec9103846aeccbf3c782';

let sql = 'INSERT INTO user (openid,session_key,nick_name,avatar_url) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE session_key = VALUES(session_key),nick_name = VALUES(nick_name),avatar_url = VALUES(avatar_url)';

function fetchApi(url) {
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) {
                reject({
                    code: -1,
                    msg: '微信接口错误',
                    data: []

                })
            } else {
                resolve(body)
            }
        });
    })
}


async function login(req, res, next) {
    try {
       
        let param = req.query || req.params;
        let code = param.code,
            nick_name = param.nickName,
            avatar_url = param.avatarUrl;
        if (!code) {
            res.json({
                code: -1,
                msg: 'code为空'
            })
            return;
        }
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
        var body = await fetchApi(url);
        body = JSON.parse(body);
        await query(sql, [body.openid, body.session_key, nick_name, avatar_url]);
        var payload = {
            openid: body.openid,
        };
        var token = jwt.sign(payload, _key, {
            expiresIn: 100
        });
        res.json({
            code: 0,
            msg: '登录成功',
            data: {
                token: token
            }
        })

    } catch (err) {
        // console.log(err)
        next(err)
    }
};
module.exports = login;