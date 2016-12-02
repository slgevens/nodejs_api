var mysql = require('mysql');

module.exports = function(router, connection) {
    router.route('/format')
	.get(function(req, res){
	var query = "SELECT * FROM ?? WHERE ?? = ?")
