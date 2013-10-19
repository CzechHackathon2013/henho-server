module.exports = function(mongoose) {
	var Schema = mongoose.Schema;

	var User = new Schema({
		name: {type: String, required: true, unique: true},
		email: {type: String, required: true, unique: true},
		username: {type: String, required: true, unique: true},
		password: {type: String, required: true},
		salt: {type: String}
	});

	User.path('name').validate(function(v) {
		return v.length > 4;
	}, 'minimálně 5 znaků');

	User.path('email').validate(function(v) {
		return v.length < 40;
	}, 'email attribute is should be less than 40 characters');

	User.path('username').validate(function(v) {
		return v.length > 4;
	}, 'minimálně 5 znaků');

	User.path('password').validate(function(v) {
		return v.length > 6;
	}, 'minimálně 5 znaků');

	return User;
};
