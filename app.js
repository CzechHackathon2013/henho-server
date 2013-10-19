var express = require('express');
var request = require('./requests');

var db = require('./database');
var app = express();


app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.get('/', request.index);

//fire it
var domain  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, domain, function() {
	console.log('Go me! ' + port);
});
