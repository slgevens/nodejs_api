var mysql = require('mysql');
var pass = require('password-hash');

module.exports = function(router, connection) {
    router.route('/inscription')
        .post(function(req, res) {
	    
	    var querySelect = "SELECT * FROM ?? WHERE ?? = ?";
	    var tableSelect = ['photo_expresso.login', 'MAIL', req.body.email ];
	    
	    querySelect = mysql.format(querySelect, tableSelect);
	    connection.query(querySelect, function(err, resultSelect){
		if (err){
		    res.status(400).send(err);	    
		}
		else if (resultSelect[0].MAIL == req.body.email){
		    res.status(404).send("Compte existant !");		   
		    console.log('999999999999999999999999999999');
		    console.log(resultSelect[0].MAIL)
		    console.log('9999999999999999999999999999999');
		}
		else {
		    console.log('22222222222222222222222222222');
		    console.log(resultSelect[0])
		    console.log('22222222222222222222222222222');
		    var query_1 = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
		    var table_1 = ['photo_expresso.login', 'MAIL', 'PASSWORD', 'IS_ARCHIVED',
				   req.body.email, pass.generate(req.body.password), '0'];
		    
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
		}
	    })
	})    
};
