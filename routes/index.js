var express = require('express');
var router = express.Router();
var goodsList = require('../goods/goodsList');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '小k博客 (htmlk.cn)'});
});

router.get('/goodsAll',function(req,res,next){  
  
  goodsList.goodsAll(req,res,next);
});

//增
router.get('/goodsAdd',function(req,res,next){
	goodsList.goodsAdd(req,res,next);
});
router.get('/goodsDelete',function(req,res,next){
	goodsList.goodsDelete(req,res,next);
});
router.get('/goodsDetail',function(req,res,next){
	goodsList.goodsDetail(req,res,next);
});
module.exports = router;
