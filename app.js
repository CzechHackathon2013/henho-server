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
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Go me! ' + port);
});
