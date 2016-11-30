var mysql = require('mysql');
var crypto = require('crypto');

module.exports = function(router, connection) {
    router.route('/oublie')
        .post(function(req, res){
	    
	    var query = "SELECT ?? FROM ?? WHERE ?? = ? ";
	    var table = ['ID_USER', 'photo_expresso.users', 'MAIL', req.body.mail ];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err)
		    res.sendStatus(400);
		else
		    if(result[0]){
			console.log("bon user");
		    }else{
			console.log("bad user");
		    }
		res.status(201).send("envoi");
		    console.log(result[0]);
	    });
	})
};
