var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/delete/:id?')
	.put(function(req, res){
	    var decodeIdUser = jwtDecode(req.headers.authorization).ID_USER;
	    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?"
	    var table = ['photo_expresso_v1.login', 'IS_ARCHIVED', '1', 'ID_USER', decodeIdUser];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err) {
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.status(201).send("Compte supprimé !");
		}
	    })
	})
};
