
var db = require('./database');

this.index = function(req, res) {
	res.send('Go me!');
};
this.getMeeting = function(req, res) {
	db.getMeeting(req.params.id, function(err, results) {
		if (err) {
			res.json(500, "Server Error");
			return;
		}
		// Respond with results as JSON
		res.json(results);
	});
};
 