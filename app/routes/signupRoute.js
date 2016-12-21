var mysql = require('mysql');
var pass = require('password-hash');

module.exports = function(router, connection) {
    router.route('/signup')
        .post(function(req, res){

	    var querySelect = "SELECT ?? FROM ?? WHERE ?? = ?";
	    var tableSelect = ['MAIL', 'photo_expresso_v1.login', 'MAIL', req.body.email ];

	    querySelect = mysql.format(querySelect, tableSelect);	
	    connection.query(querySelect, function(err, resultSelect){
		if (err) {
		    res.status(400).send(err);
		}
		else if (resultSelect.length != 0) {
		    res.status(404).send("Compte existant !");
		}
		else {
		    var queryInsert = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
		    var tableInsert = ['photo_expresso_v1.login', 'MAIL', 'PASSWORD', 'IS_ARCHIVED',
				   req.body.email, pass.generate(req.body.password), '0'];
		    
		    queryInsert = mysql.format(queryInsert, tableInsert);
		    connection.query(queryInsert, function(err, resultInsert){
			if (err) {
			    res.status(400).send(err);
			}
			else {			    
			    var queryInsertUser = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			    var tableInsertUSer = ['photo_expresso_v1.users', 'FIRSTNAME', 'LASTNAME', 'ADDR_L1',
						   'ADDR_L2', 'COMPLEMENT', 'POSTAL_CODE', 'CITY', 'ID_MASK', 'ID_PAPER', 'ID_USER',
						   req.body.firstname, req.body.lastname, req.body.addr_l1, req.body.addr_l2,
						   req.body.complement, req.body.postal_code, req.body.city, req.body.id_masque,
						   req.body.id_paper, resultInsert.insertId];
			    queryInsertUser = mysql.format(queryInsertUser, tableInsertUSer);
			    connection.query(queryInsertUser, function(err){
				if (err)
				    res.status(400).send(err);
				else
				    res.status(200);
			    })			    
			}
		    })
		    res.status(201).send("Registred");
		}
	    });
	})
}
