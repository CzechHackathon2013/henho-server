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
app.listen(8080, function() {
	console.log('Go me! ');
});
