var query = require('../query/index');
var goodsListSql = require('./goodsSql');
var jsonWrite = function (res, ret) {
	if (typeof ret === 'undefined') {
		res.json({
			code: '1',
			msg: '操作失败'
		});
	} else if (ret.length == 0) {
		res.json({
			code: '0',
			msg: '查无结果'
		})
		// return
	} else {
		res.json({
			code:0,
			msg:'success',
			data:ret
		});
	}
};

async function goodsAll(req, res, next) {

	let result = await  query(goodsListSql.goodsAll);
		// console.log('查询成功',result);
		jsonWrite(res, result);	
};

// function goodsAdd(req, res, next) {
// 	var param = req.query || req.params;
// 	query(goodsListSql.goodsInsert, [param.name, param.desc, param.price, param.sum], function (result) {
// 		jsonWrite(res, result);
// 	})

// };

function goodsDelete(req, res, next) {
	var param = req.query || req.params;
	query(goodsListSql.goodsDelete, param.id, function (result) {
		jsonWrite(res, result);
	})
}

function goodsDetail(req, res, next) {
	var param = req.query || req.params;
	query(goodsListSql.goodsDetail, param.id, function (result) {
		jsonWrite(res, result);
	})
}
module.exports = {
	goodsAll: goodsAll,
	goodsAdd: goodsAdd,
	goodsDelete: goodsDelete,
	goodsDetail: goodsDetail
};