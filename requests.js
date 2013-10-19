/*
var mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@ds027908.mongolab.com:27908/blog');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function callback() {
	console.log("Database is listening");
});
var User = require('./models/user')(mongoose);
var UserModel = mongoose.model('User', User);
*/

this.index = function(req, res) {
	res.send('wee');
};
