var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/compte/:id?')
	.get(function(req, res){

	    var getIdUserDecodeCompte = jwtDecode(req.headers.authorization).ID_USER;
	    var queryGetCompte = "SELECT * FROM ?? WHERE ?? = ?";
	    var tableGetCompte = ['photo_expresso.view_compte', 'ID_USER', getIdUserDecodeCompte];
	    queryGetCompte = mysql.format(queryGetCompte, tableGetCompte);
	    connection.query(queryGetCompte, function(err, result){
		if (err)
		    res.status(400).send(err);
		else
		    res.send(result);
	    });
	})	   	    
};
    
