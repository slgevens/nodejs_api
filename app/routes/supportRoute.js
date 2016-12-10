var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/support/:id?')
        .post(function(req, res){
	    var idUserDecodeSupport = jwtDecode(req.headers.authorization).ID_USER;
	    var querySupport = "INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)";
	    var tableSupport = ['photo_expresso.demande_sav', 'ID_USER', 'TYPE', 'STATUS', 'CONTENT',
				idUserDecodeSupport, req.body.type, 'Ouvert', req.body.content ];

	    querySupport = mysql.format(querySupport, tableSupport);
	    connection.query(querySupport, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.status(201).send("Message sent !");
		}
	    });
	})
    
	.get(function(req, res){
	    var getIdUserDecodeSupport = jwtDecode(req.headers.authorization).ID_USER;
	    var queryGetSupport = "SELECT * FROM ?? WHERE ?? = ?";
	    var tableGetSupport = ['photo_expresso.demande_sav', 'ID_USER', getIdUserDecodeSupport];

	    queryGetSupport = mysql.format(queryGetSupport, tableGetSupport);
	    connection.query(queryGetSupport, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.send(result);
		}
	    });
	})
};

