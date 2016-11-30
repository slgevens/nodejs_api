var mysql = require('mysql');

module.exports = function(router, connection) {
    router.route('/inscription')
        .post(function(req, res) {
	    var query_1 = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
	    var table_1 = ['photo_expresso.login', 'MAIL', 'PASSWORD', 'IS_ARCHIVED', req.body.email, req.body.password, '0'];

	    query_1 = mysql.format(query_1, table_1);
	    connection.query(query_1, function(err, result_1){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    var query_2 = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
		    var table_2 = ['photo_expresso.users', 'FIRSTNAME', 'LASTNAME', 'ADDR_L1',
				   'ADDR_L2', 'COMPLEMENT', 'POSTAL_CODE', 'CITY', 'ID_USER',
				   req.body.firstname, req.body.lastname, req.body.addr_l1, req.body.addr_l2,
				   req.body.complement, req.body.postal_code, req.body.city, result_1.insertId];
		    
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
