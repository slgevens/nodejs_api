// On apelle les dépendances comme dhab
var mysql = require('mysql');

// un exports de module C.F les require dans le fichier server.js
module.exports = function(router, connection) {
    router.route('/signin')
        .post(function(req, res) {
	    var query_1 = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
	    var table_1 = ['api_node_js.login', 'username', 'password', 'is_archived', req.body.username, req.body.password,'0'];

	    query_1 = mysql.format(query_1, table_1);
	    connection.query(query_1, function(err, result_1){
		if (err)
		    res.status(400).send(err);
		else {
		    var query_2 = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)";
		    var table_2 = ['api_node_js.info_users', 'FIRSTNAME', 'LASTNAME', 'ADDRESS', 'POSTAL_CODE', 'MAIL', 'CITY', 'ID_USER',
				   req.body.firstname, req.body.lastname, req.body.address, req.body.postal_code, req.body.mail, req.body.city, result_1.insertId];
		    query_2 = mysql.format(query_2, table_2);
		    connection.query(query_2, function(err){
			if (err)
			    res.status(400).send(err);
			else
			    res.status(201).send("Registred");
		    })
		}
	    })
        })
};
