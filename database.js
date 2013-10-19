var mysql = require('mysql');

var pool = mysql.createPool({
	host: "localhost",
	//user: "root", //"adminGqFFrbH"
	//password: "q", //"CFa7-xWAFinc"
	//database: "henho", //"nodejs"
	user: "adminGqFFrbH",
	password: "CFa7-xWAFinc",
	database: "nodejs",
	connectionLimit: 10,
	supportBigNumbers: true
});

this.getRecords = function(params, callback) {

	// get a connection from the pool
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		// make the query
		connection.query("SELECT * FROM test", [params], function(err, results) {
			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			callback(false, results);
		});
		connection.release();
	});
};
