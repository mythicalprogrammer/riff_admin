//http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 13;

var AdminSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
});

AdminSchema.pre('save', function(next) {
	var admin = this;

	// only hash the password if it has been modified (or is new)
	if (!admin.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(admin.password, salt, function(err, hash) {
			if (err) return next(err);

			// override the cleartext password with the hashed one
			admin.password = hash;
			next();
		});
	});
});

AdminSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('Admin', AdminSchema);
