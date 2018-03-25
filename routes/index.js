var express = require('express');
var router = express.Router();
var user = require('../routerAction/user');
var jwt = require('jsonwebtoken');
const _key =  require('../config/secret');
let param;
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
			var decoded = jwt.verify(param.token, _key);
			console.log(decoded,111)
		  } catch(err) {
			  console.log(err,222)
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
	console.log(param, 111)
	user.login(param, res, nex);
});

module.exports = router;