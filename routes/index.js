var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/defaultTable', function(req, res){
  console.log('get request for default table reached...');
  mongoose.model('table').findOne({uid: '0'}, function(err, model){
    res.send(model);
  });
});

module.exports = router;
