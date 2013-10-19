#!/bin/env node
var express = require('express');
var request = require('./requests');
var orm = require('orm');
var db = require('./database');
var app = express();

if ('production' === app.get('env')) {	//Openshift
	process.env.MYSQL_DB_HOST = process.env.OPENSHIFT_MYSQL_DB_HOST;
	process.env.MYSQL_DB_USERNAME = process.env.OPENSHIFT_MYSQL_DB_USERNAME;
	process.env.MYSQL_DB_PASSWORD = process.env.OPENSHIFT_MYSQL_DB_PASSWORD;
	process.env.MYSQL_DB_DATABASE = process.env.OPENSHIFT_GEAR_NAME;
	process.env.DOMAIN = process.env.OPENSHIFT_NODEJS_IP;
	process.env.PORT = process.env.OPENSHIFT_NODEJS_PORT;
} else if ('development' === app.get('env')) {
	process.env.MYSQL_DB_HOST = "localhost";
	process.env.MYSQL_DB_USERNAME = "root";
	process.env.MYSQL_DB_PASSWORD = "q";
	process.env.MYSQL_DB_DATABASE = "henho";
	process.env.DOMAIN = "localhost";
	process.env.PORT = 3000;
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}


app.use(orm.express("mysql://" + process.env.MYSQL_DB_USERNAME + ":" + process.env.MYSQL_DB_PASSWORD + "@" + process.env.MYSQL_DB_HOST + "/" + process.env.MYSQL_DB_DATABASE, {
	define: function(db, models, next) {
		models.person = db.define("person", {
			username: String,
			password: String,
			email: String
		}, {
			methods: {
				fullName: function() {
					return this.name + ' ' + this.surname;
				}
			},
			validations: {
				username: orm.enforce.required("Chybí uživatelské jméno"),
				email: orm.enforce.patterns.email()
			}
		});
		next();

		db.drop();
		db.sync();
	}
}
));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.logger());
app.use(app.router);

//routes
app.get('/', request.index);
app.get('/meetings/:id', request.getMeeting);

//fire it
app.listen(process.env.PORT, process.env.DOMAIN, function() {
	console.log('server is running...');
});
