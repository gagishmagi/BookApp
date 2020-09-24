var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('We have Users');
});

router.get('/add', function (req, res ,next) {
  res.send('Add a new user');
});

module.exports = router;
