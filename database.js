var mysql = require('mysql');

var pool = mysql.createPool({
	host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
	user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
	password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
	database : process.env.OPENSHIFT_GEAR_NAME,
	connectionLimit: 10,
	supportBigNumbers: true
});

this.getMeeting = function(id, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		connection.query("SELECT * FROM `meeting` LEFT JOIN `user` ON `meeting`.`creator_id` = `user`.`id` WHERE `meeting`.`id` = ?", [id], function(err, results) {
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
