var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});
router.get('/id/:name', function(req, res, next) {
  console.log(req.params.name,111222)
  res.send('name is:'+req.params.name);

});

module.exports = router;
