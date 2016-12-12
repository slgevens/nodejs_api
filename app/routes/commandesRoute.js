var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/commandes/:id?')
        .post(function(req, res){
	    var decodeIdUser = jwtDecode(req.headers.authorization).ID_USER;
	    var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??) VALUES ('?', ?, ?, ?, ?, ?, ?, ?)";
	    var table = ['photo_expresso.command', 'ID_USER', 'NOMBRE_PHOTO', 'PRICE', 'CONTENT', 'STATUS',
			 'COMMAND_FILES', 'ID_MASQUE', 'ID_PAPER', decodeIdUser, req.body.nbr_photo,
			 req.body.price, req.body.content, '0', req.body.files,
			 req.body.id_masque, req.body.id_paper ];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    var selectIdCommand = jwtDecode(req.headers.authorization).ID_USER;
		    var querySelect = "SELECT * FROM ?? WHERE ?? = ?";
		    var tableSelect = ['photo_expresso.command', 'ID_USER', selectIdCommand ];

		    querySelect = mysql.format(querySelect, tableSelect);
		    connection.query(querySelect, function(err, resultSelect){
			if (err) {
			    res.status(400).send(err);
			}
			else {
			    console.log('8888888888888888');
			    console.log(resultSelect[0].ID_COMMAND);
			    console.log('8888888888888888');
			    
			    var queryDestination = "INSERT INTO ?? (??, ??, ??,??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
			    var tableDestination = ['photo_expresso.command_destination', 'ID_COMMAND', 'FIRSTNAME',
						    'LASTNAME', 'ADDR_L1', 'ADDR_L2', 'POSTAL_CODE', 'CITY',
						    'COMPLEMENT', resultSelect[0].ID_COMMAND, req.body.firstname, req.body.lastname,
						    req.body.addr_l1, req.body.add_l2, req.body.postal_code,
						    req.body.city, req.body.complement];			    
			}
		    });
		    res.status(201).send("Order created !")
		}
	    });
	})
    
        .get(function(req, res){
	    var iDUserDecode = jwtDecode(req.headers.authorization).ID_USER;
	    var query = "SELECT * FROM ?? WHERE ?? = ?";
	    var table = ['photo_expresso.command', 'ID_USER', iDUserDecode ];
	    
	    query = mysql.format(query, table)
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.send(result);
		}
	    });
	})
    
};
