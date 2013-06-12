/**
 * @name db 
 *  @author Anthony Doan <mythicalprogrammer@gmail.com>
 *  @desc run all dbs here 
 */

var db = function() {
	// mongoose list here
	require('./mongoose_connect').connect('rift');
}

module.exports.runAllDB = db;  
