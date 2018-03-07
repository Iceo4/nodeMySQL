module.exports = {
    goodsInsert:'INSERT INTO `goods` (`id`,`name`,`desc`,`price`,`sum`) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE `name`=VALUES(`name`),`desc`=VALUES(`desc`),`price`=VALUES(`price`),`sum`=VALUES(`sum`)',
    goodsDelete: 'DELETE FROM `goods` WHERE `id`=?',
    goodsAll:'select * from goods',
    selectById:'select * from ?? where `id`=?'

}