// On apelle les dépendances comme dhab
var mysql = require('mysql');

// un exports de module C.F les require dans le fichier server.js
module.exports = function(router, connection) {
    router.route('/accounts/:id?')
        .get(function(req, res) {
            // ?? = clé, ? = valeur
            // on déclare séparement les clé/valeur de la query pour question securité et eviter les injections SQL
            var query        = "SELECT * FROM ?? WHERE ?? = ? ";
            var table        = ['photo_expresso.login', 'is_archived','0'];
	    
	    if (req.params.id){
		query += "AND ?? = ?";
		table.push("id", req.params.id);
	    }
            // on fusione les deux pour formater la requete
            query            = mysql.format(query, table);
            // ON lange la requete avec un callback error ou bien result
            connection.query(query, function(err, result) {
                // si jamais il y a une erreur
                if (err) {
                    res.status(400).send(err);
                // Dans ce cas on envoie les donnée
                } else {
                    res.send(result);
                }
            })
        })
	.post(function(req, res) {
	    var query = "INSERT INTO ??  (??, ??, ??) VALUES (?, ?, false)";
	    var table = ['photo_expresso.login', 'username', 'password', 'is_archived', req.body.username, req.body.password];
	    query = mysql.format(query, table);
	    connection.query(query, function(err) {
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    res.status(201).send("Created");
		}
	    })
	    
	})
};
