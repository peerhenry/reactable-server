var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var routes = require('./routes/index');
var users = require('./routes/users');

var appSetter = {

	setupExpress: function(){
		var app = express();
		app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'views')));
    app.set('view engine', 'pug');
    app.use(function(req, res, next){
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
    });
		return app;
	},

  connect: function(address){
    mongoose.connect(address);
    var db = mongoose.connection;
    db.on('error', function(){
      console.log('db error occured');
    });
    db.once('open', function(){
      console.log('db connection success');
    });
  },

	loadModels: function(){
		fs.readdirSync(path.join(__dirname, 'models')).forEach(function(fileName){
			require(path.join(__dirname, 'models', fileName));
		});
	},

  setRouters: function(app){
    app.use('/', routes);
    app.use('/users', users);
    this.handleNotFound(app);
    this.handleServerError(app);
  },

  handleNotFound: function(app){
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
  },

  handleServerError: function(app){ 
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err  // development error handler will print stacktrace
        });
      });
    } else{
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {} // production error handler no stacktraces leaked to user
        });
      });
    }
  }

}

module.exports = appSetter;