var mysql = require('mysql');
var crypto = require('crypto');

module.exports = function(router, connection) {
    router.route('/delete/:id')
	.put(function(req, res){
	    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?"
	    var table = ['photo_expresso.login', 'is_archived', '1', 'id', req.params.id];
	    query = mysql.format(query, table);
	    connection.query(query, function(err) {
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.status(200).send("Deleted");
		}
	    })
	})
};
