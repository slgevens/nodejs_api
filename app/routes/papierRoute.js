var mysql = require('mysql');

module.exports = function(router, connection) {
    router.route('/papier')

	.get(function(req, res){
	    var query = "SELECT * FROM ?? WHERE ?? = ?";
	    var table = ['photo_expresso.paper', 'STATUS', '0'];

	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err)
		    res.status(400);
		else 
		    res.send(result);
	    });
	});
};
