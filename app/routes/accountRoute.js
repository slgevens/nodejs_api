var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/account/:id?')
	.get(function(req, res){

	    var getIdUserDecodeCompte = jwtDecode(req.headers.authorization).ID_USER;
	    var queryGetCompte = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	    var tableGetCompte = ['photo_expresso_v1.view_users_detail', 'ID_USER', getIdUserDecodeCompte, 'IS_ARCHIVED', '0'];
	    
	    queryGetCompte = mysql.format(queryGetCompte, tableGetCompte);
	    connection.query(queryGetCompte, function(err, result){
		if (err)
		    res.status(400).send(err);
		else if (result.length == 0)
		    res.status(404).send("Adresse mail ou mot de passe introuvable !");	
		else
		    res.send(result);
	    });
	})	   	    
};
    
