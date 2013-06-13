var express = require('express'),
	wine = require('./routes/wines');

var mongoose = require('mongoose'),
	Admin = require('./models/admin-model');

// run all the db
require('./libs/db/allDB').runAllDB();

// authentication
var passport = require('passport'),
	DigestStrategy = require('passport-http').DigestStrategy;

function findByEmail(username, fn) {
	return Admin.findOne({ email:username }, 
			function(err, admin) {
				if (err) return fn(null, null);
				return fn(null, admin);
			});
}

// Use the DigestStrategy within Passport.
//   This strategy requires a `secret`function, which is used to look up the
//   use and the user's password known to both the client and server.  The
//   password is used to compute a hash, and authentication will fail if the
//   computed value does not match that of the request.  Also required is a
//   `validate` function, which can be used to validate nonces and other
//   authentication parameters contained in the request.
passport.use(new DigestStrategy({ qop: 'auth' },
			function(username, done) {
				// Find the user by username.  If there is no user with the given username
				// set the user to `false` to indicate failure.  Otherwise, return the
				// user and user's password.
				findByEmail(username, function(err, user) {
					if (err) { return done(err); }
					if (!user) { return done(null, false); }
					return done(null, user, user.password);
				})
			},
			function(params, done) {
				// asynchronous validation, for effect...
				process.nextTick(function () {
					// check nonces in params here, if desired
					return done(null, true);
				});
			}
			));

/*
   Admin.findOne({ email:'jay@splooth.com' }, 
   function(err, admin) {
   console.log(admin);
   });
 */

// create a admin new Admin 
/*
   var AnthonyAdmin = new Admin({
   name: 'Anthony Doan3',
   email: 'Anthony@splooth3.com',
   password: '123456'
   });

   AnthonyAdmin.save(function(err){
   if (err) throw err;

// fetch user and test password verification
Admin.findOne({ name: 'Anthony Doan3' }, function(err, admin) {
if (err) throw err;

// test a matching password
admin.comparePassword('123456', function(err, isMatch) {
if (err) throw err;
console.log('123456:', isMatch); // -> Password123: true
});

// test a failing password
admin.comparePassword('123Password', function(err, isMatch) {
if (err) throw err;
console.log('123Password:', isMatch); // -> 123Password: false
});
});

}); 

Admin.findOne({ email:'jay@splooth.com' }, 
function(err, admin) {
console.log(admin);
});
 */
var app = express();

app.configure(function () {
	app.use(express.logger('dev'));     // 'default', 'short', 'tiny', 'dev' 
	//app.use(app.router);
	//app.get('/login', auth.login);
	app.use(passport.initialize());
	app.use(express.bodyParser());
});

app.get('/login', 
		function(req,res,next) { 
			console.log('/login reporting for duty');
			Admin.findOne({ name: req.body.username }, function(err, admin) {
				if (err) throw err;

				// test a matching password
				admin.comparePassword(req.body.password, function(err, isMatch) {
					if(err) return res.send(500,"Invalid credentials");
					req.session.user = user;
					next();
				});

			});
});
			app.get('/wines', passport.authenticate('digest', { session: true}), wine.findAll);
			app.get('/wines/:id', passport.authenticate('digest', { session: true}), wine.findById);
			app.post('/wines', passport.authenticate('digest', { session: true}), wine.addWine);
			app.put('/wines/:id', passport.authenticate('digest', { session: true}), wine.updateWine);
			app.delete('/wines/:id', passport.authenticate('digest', { session: true}), wine.deleteWine);

			app.listen(3000);
			console.log('Listening on port 3000...');
