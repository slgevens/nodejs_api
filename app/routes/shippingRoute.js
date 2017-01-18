var mysql = require('mysql');

module.exports = function(router, connection) {
    router.route('/shipping')
        .get(function(req, res){
	    var query = "SELECT * FROM ?? WHERE ?? LIKE '%SHIPPING_COST%'";
	    var table = ['photo_expresso_v1.settings', 'ID_TYPE' ];

	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400);
		    return;
		}
		res.send(result);
	    });
	});
}
