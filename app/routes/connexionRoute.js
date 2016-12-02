var mysql = require('mysql');
var jwt   = require('jsonwebtoken');

module.exports = function(router, connection) {
    router.route('/hello')
        .get(function(req, res) {
            res.status(200).send("Hello !");
        })
    router.route('/connexion')
	.post(function(req, res){
	    var query_1 = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	    var table_1 = ['photo_expresso.login', 'MAIL', req.body.email, 'PASSWORD', req.body.password];

	    query_1 = mysql.format(query_1, table_1);
	    connection.query(query_1, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else if (result_1.length == 0) {
		    res.status(404).send("Introuvable !");
		}
		else {
		    if (req.body.password !== result_1[0].password) {			
			res.status(401).send("Non autorisé !");
		    }
		    else {
			console.log('222222222222222222222222', req.body.password, result_1[0].password);
			var query_2 = "SELECT * FROM ?? WHERE ?? = ?";
			var table_2 = ['photo_expresso.usersInfos', 'ID_USER', result_1[0].id];
			query_2 = mysql.format(query_2, table_2);
			connection.query(query_2, function(err, result_2){
			    if  (err) {
				res.status(400).send(err);
			    }
			    else {
				var token = jwt.sign(result_2[0], "nv7D4ZzOQ7", {
				    expiresIn:14400
				});
				res.send(token);
			    }				
			})			
		    }					    
		}
	    })
	    
	})
};
