module.exports = {
    goodsInsert:'INSERT INTO `goods` (`id`,`name`,`desc`,`price`,`sum`) VALUES(0,?,?,?,?)',
    goodsDelete: 'DELETE FROM `goods` WHERE `id`=?',
    goodsAll:'select * from goods',
    goodsDetail:'select * from goods where `id`=?'

}