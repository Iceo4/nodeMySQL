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
			code: -2,
			msg: '查无结果'
		})
		// return
	} else {
		res.json({
			code: 0,
			msg: 'success',
			data: ret
		});
	}
};
async function selectById(table, id) {
	try {
		let result = await query(goodsListSql.selectById, [table, id]);

		return result

	} catch (err) {
		throw new Error(err);
	}
}

async function goodsAll(req, res, next) {
	try {
		let result = await query(goodsListSql.goodsAll);
		jsonWrite(res, result);
	} catch (err) {
		next(err)
	}
};

async function goodsAdd(req, res, next) {

	try {
		let param = req.query || req.params;
		let ss = await query( goodsListSql.goodsInsert, [param.id,param.name, param.desc, param.price, param.sum])
		console.log(ss,111);
		let result = await selectById('goods', param.id)

		jsonWrite(res, result);

	} catch (err) {
		next(err)
	}
};
async function goodsDetail(req, res, next) {
	try {
		let param = req.query || req.params;
		let result = await selectById('goods', param.id);

		jsonWrite(res, result);

	} catch (err) {
		next(err)
	}
}

async function goodsDelete(req, res, next) {
	var param = req.query || req.params;
	try {
		let result = await selectById('goods', param.id);
		if (result.length == 0) {
			jsonWrite(res, result);
		} else {
			await query(goodsListSql.goodsDelete, param.id);
			jsonWrite(res, {
				msg: '删除成功'
			})
		}
	} catch (e) {
		next(e)
	}


}


module.exports = {
	goodsAll: goodsAll,
	goodsAdd: goodsAdd,
	goodsDelete: goodsDelete,
	goodsDetail: goodsDetail
};