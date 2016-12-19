var mysql = require('mysql');

module.exports = function(router, connection) {
    router.route('/frais')
        .get(function(req, res){
	    var query = "SELECT * FROM ?? ";
	    var table = ['photo_expresso.settings'];

	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400);
		}
		else {
		    res.send(result);
		}
	    });
	});
}
