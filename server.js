#!/bin/env node
var express = require('express');
var request = require('./requests');
var orm = require('orm');
var db = require('./database');
var app = express();


app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.use(orm.express("mysql://henho:henho@localhost/henho", {
        define: function (db, models, next) {
            models.person = db.define("person", {
                username: String,
                password: String,
                email: String
            }, {
                methods: {
                    fullName: function () {
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

app.get("/", function (req, res) {
    // req.models is a reference to models used above in define()
//    req.models.person.find(...);
});

//fire it
var domain = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, domain, function () {
    console.log('Go me! ' + port);
});
