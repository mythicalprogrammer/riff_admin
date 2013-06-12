var express = require('express'),
	wine = require('./routes/wines');

var mongoose = require('mongoose'),
	Admin = require('./models/admin');

var connStr = 'mongodb://localhost:27017/rift';
mongoose.connect(connStr, function(err) {
	if (err) throw err;
	console.log('Successfully connected to Mongo');
});

Admin.findOne({ email:'Anthony@rift.info' }, 
	function(err, admin) {
		console.log(admin);
});

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);
 
app.listen(3000);
console.log('Listening on port 3000...');
