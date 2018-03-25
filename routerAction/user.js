var jwt = require('jsonwebtoken');
const _key =  require('../config/secret');
var utils =  require ('./utils');
var  user = require ('../sqlFunction/user');
var  select = require ('../sqlFunction/utils');
const APPID = 'wx3ce22d4f5afb322b';
const   APP_SECRET = '87f8306c5370ec9103846aeccbf3c782';
async function login(param, res, next) {
    try {
        let code = param.code,
            nick_name = param.nickName,
            gender = param.gender,
            avatar_url = param.avatarUrl;
        if (!code) {
            res.json({
                code: -1,
                msg: 'code为空'
            })
            return;
        }
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`;
        var body = await utils.fetchApi(url);
        body = JSON.parse(body);
        if(!body.openid){
            res.json({
                code:-1,
                body
            })
            return;
        }
        await user.updateUser({
            openid:body.openid, 
            session_key:body.session_key,
            nick_name:nick_name, 
            avatar_url:avatar_url,
            gender
        });
        var  selectData = await select.findBy('user',{openid:body.openid},'id,gender');
        var payload = {
            openid: body.openid,
            uid:selectData[0].id
        };
        var token = jwt.sign(payload, _key, {
            expiresIn: 180,
        });
        res.json({
            code: 0,
            msg: '登录成功',
            data: {
                token: token
            }
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
};
async  function getUserInfo (token){

}
module.exports = {
    
    login:login

};