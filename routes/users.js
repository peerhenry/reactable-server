var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('table').find({uid: '0'}, function(err, dummies){
    var output = dummies + '\n' + 'length is ' + dummies.length;
    res.send(output);
  });//*/
});

module.exports = router;