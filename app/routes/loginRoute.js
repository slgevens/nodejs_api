// On apelle les dépendances comme dhab
var mysql = require('mysql');
var jwt   = require('jsonwebtoken');

// un exports de module C.F les require dans le fichier server.js
module.exports = function(router, connection) {
    router.route('/hello')
        .get(function(req, res) {
            // Test de l'api xx.xx.xx/api/hello
            res.status(200).send("Ok !");
        })
    router.route('/login/')
	.post(function(req, res){
	    var query_1 = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	    var table_1 = ['api_node_js.login', 'username', req.body.username, 'password', req.body.password];

	    query_1 = mysql.format(query_1, table_1);
	    connection.query(query_1, function(err, result_1){
		if (err)
		    res.status(400).send(err);
		else if (result_1.length == 0)
		    res.status(404).send("Not found !");
		else {
		    if (req.body.password !== result_1[0].password)
			res.status(401).send("Non authorized");
		    else {
			console.log(req.body.password, result_1[0].password);
			var query_2 = "SELECT * FROM ?? WHERE ?? = ?";
			var table_2 = ['api_node_js.view_users', 'ID_USER', result_1[0].id];
			query_2 = mysql.format(query_2, table_2);
			connection.query(query_2, function(err, result_2){
			    if  (err)
				res.status(400).send(err);
			    else {
				var token = jwt.sign(result_2[0], "token_secret", {
				    expiresIn:14400
				});
				res.send(token);
			    }				
			})			
		    }					    
		}
	    })
	    
	})
    router.route('/delete/:id')
        .put(function(req, res){
	    var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?"
	    var table = ['api_node_js.login', 'is_archived', '1', 'id', req.params.id];
	    query = mysql.format(query, table);
	    connection.query(query, function(err) {
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.status(200).send("Deleted");
		}
	    })
	})
};
