var express = require('express'),
		request = require('./requests');

var app = express();

app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.get('/', request.index);

//fire it
app.listen(3000, function() {
	console.log('Go me!');
});
