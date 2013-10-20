var orm = require('orm');

module.exports = function(db, cb) {
	db.define("user", {
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

	db.define("meeting", {
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
	return cb();
}