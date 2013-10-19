var mysql = require('mysql');

var connection;

function connect() {
	connection = mysql.createConnection({
		host: process.env.MYSQL_DB_HOST,
		user: process.env.MYSQL_DB_USERNAME,
		password: process.env.MYSQL_DB_PASSWORD,
		database: process.env.MYSQL_DB_DATABASE,
		connectionLimit: 10,
		supportBigNumbers: true
	});
	connection.connect();
}

this.getMeeting = function(id, callback) {
	connect();
	connection.query("SELECT * FROM `meeting` LEFT JOIN `user` ON `meeting`.`creator_id` = `user`.`id` WHERE `meeting`.`id` = ?", [id], function(err, results) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		callback(false, results);
	});
};
