var express = require('express'),
	wine = require('./routes/wines');

var mongoose = require('mongoose'),
	Admin = require('./models/admin-model');

// run all the db
require('./libs/db/allDB').runAllDB();
Admin.findOne({ email:'jay@splooth.com' }, 
		function(err, admin) {
			console.log(admin);
		});


/*
var connStr = 'mongodb://localhost:27017/rift';
mongoose.connect(connStr, function(err) {
	if (err) throw err;
	console.log('Successfully connected to Mongo rift');
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
   var app = express();

   app.configure(function () {
   app.use(express.logger('dev'));     // 'default', 'short', 'tiny', 'dev' 
   app.use(express.bodyParser());
   });

   app.get('/wines', wine.findAll);
   app.get('/wines/:id', wine.findById);
   app.post('/wines', wine.addWine);
   app.put('/wines/:id', wine.updateWine);
   app.delete('/wines/:id', wine.deleteWine);

   app.listen(3000);
   console.log('Listening on port 3000...');
 */
