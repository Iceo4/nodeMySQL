var query = require('../../query/index');
var jwt = require('jwt-simple');
var _key = require('../../config/secret');
var request = require('request');
const APPID = 'wx3ce22d4f5afb322b',
    APP_SECRET = '87f8306c5370ec9103846aeccbf3c782';





function login(req, res, next) {

    try {
        let param = req.query || req.params;
        let code = param.code;
        if (!code) {
            res.json({
                code: -1,
                msg: 'code为空'
            })
            return;
        }
        let token = jwt.encode({q:2}, _key),
            decode = jwt.decode(token, _key);
            console.log(token)
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
        console.log(url,111)
        request(url, function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response ); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google let 
             body = JSON.parse(body);
            res.json(body)
        })
        // res.json({
        //     a:1
        // })
        // jsonWrite(res, result);

    } catch (err) {
        next(err)
    }
};
module.exports = login;