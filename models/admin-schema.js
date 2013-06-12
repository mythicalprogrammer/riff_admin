/**
 *  @name admin-schema
 *  @author Anthony Doan <mythicalprogrammer@gmail.com>
 *  @desc The admin schema for the admin model 
 */
module.exports.adminSchema = {
	name: { type: String, required: true},
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
};
