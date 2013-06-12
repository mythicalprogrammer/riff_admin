//http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdminSchema = new Schema({
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
});

AdminSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('Admin', AdminSchema);
