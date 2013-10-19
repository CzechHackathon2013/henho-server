var mysql = require('mysql');

var pool = mysql.createPool({
	host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
	user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
	password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
	database : process.env.OPENSHIFT_GEAR_NAME,
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
