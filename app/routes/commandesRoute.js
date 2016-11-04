// On apelle les dépendances comme dhab
var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

// un exports de module C.F les require dans le fichier server.js
module.exports = function(router, connection) {
    router.route('/commandes/:id?')
        .post(function(req, res){
	    var query = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
	    var table = ['api_node_js.commandes', 'USER_ID', 'content', req.body.id, req.body.content ];

	    query = mysql.format(query, table);
	    connection.query(query, function(err){
		if (err)
		    res.status(400).send(err);
		else
		    res.status(201).send("Created")
	    });
	})
    
        .get(function(req, res){
	    var decode = jwtDecode(req.headers.authorization).username;
	   
	    var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	    var table = ['api_node_js.view_commands', 'USER_ID', req.params.id, 'username', decode ];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err)
		    res.status(400).send(err);
		else
		    res.send(result);
	    });
	})

};
