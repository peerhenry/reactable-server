var appSetter = require('./appsetter');

var app = appSetter.setupExpress();
appSetter.connect("localhost:27017/reactable");
appSetter.loadModels();
appSetter.setRouters(app);
appSetter.handleNotFound(app);
appSetter.handleServerError(app);

module.exports = app;