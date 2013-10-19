
var db = require('./database');

this.index = function(req, res) {
	db.getRecords("jentak", function(err, results) {
		if (err) {
			res.json(500, "Server Error");
			return;
		}
		// Respond with results as JSON
		res.json(results);
	});
};
 