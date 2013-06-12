/**
 * @name mongoose_connection
 *  @author Anthony Doan <mythicalprogrammer@gmail.com>
 *  @desc Put all your db connections here relating to mongoose (multiple db and such) 
 */

var db = function(dbName) {
	switch(dbName.toLowerCase()) {
		case 'rift':	
			require('../base/db_base').connect('mongodb://localhost:27017/rift','rift', require('mongoose'));
			break;
		default:
			console.log('No db configuration. Please add configuration in libs/mongoose_connect.js');
	}
};

module.exports.connect = db;  
