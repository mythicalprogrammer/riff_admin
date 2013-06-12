/**
 * @name base db object
 *  @author Anthony Doan <mythicalprogrammer@gmail.com>
 *  @desc Base object for mongoose db connection 
 */

var connect = function (connStr, dbName, dbObj) {
	dbObj.connect(connStr, function(err) {
		if (err) throw err;
		console.log('Successfully connected to db: '+dbName);
	});
};

module.exports.connect = connect;  
