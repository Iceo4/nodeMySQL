var express = require('express');
var router = express.Router();
var user = require('../routerAction/user');
var jwt = require('jsonwebtoken');
const _key =  require('../config/secret');
let param = new Object();
let decodedObj = new Object();
router.all('*', function (req, res, next) {

	if (req.method == "POST") {
		param = req.body;

	} else if (req.method == "GET") {
		param = req.query || req.params;

	} else {
		res.json({
			data: -1,
			msg: '方法错误'
		})
		return;
	}
	if (req.path != '/login') {
		try {
			decodedObj = jwt.verify(param.token, _key);
			param.decodedObj = decodedObj;
		  } catch(err) {
			  res.json({
				  code:-1,
				  msg:err.message||'token无效'
			  })
			 return;
		  }
	}
	
	next();

})

router.all('/login', function (req, res, nex) {
	user.login(param, res, nex);
});
router.all('/user/getInfo',async function(req,res,next){
	user.getUserInfo(param, res, next);
})
module.exports = router;