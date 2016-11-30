var mysql = require('mysql');
var crypto = require('crypto');

module.exports = function(router, connection) {
    router.route('/oublie')
        .post(function(req, res){
	    // https://blog.tompawlak.org/generate-random-values-nodejs-javascript
	    // to generate a radom password in lower and UPPERCASE
	    function randompass (howMany, chars) {
		chars = chars
		    || "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		var rnd = crypto.randomBytes(howMany)
		, value = new Array(howMany)
		, len = chars.length;

		for (var i = 0; i < howMany; i++) {
		    value[i] = chars[rnd[i] % len]
		};
		return value.join('');
	    }
	    // check if the mail exists
	    var query = "SELECT ?? FROM ?? WHERE ?? = ? ";
	    var table = ['ID_USER', 'photo_expresso.login', 'MAIL', req.body.mail ];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.sendStatus(400);
		}
		else {
		    if(result[0]){
			// change password if the mail exists and cleaning token and token_validity
			var new_token = '';
			var update_passsword = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
			var table_update = ['photo_expresso.login', 'PASSWORD', randompass(10), 'TOKEN', new_token, 'TOKEN_VALIDITY', new_token, 'ID_LOGIN', result[0] ];
			update_passsword = mysql.format(update_passsword, table_update);
			connection.query(update_passsword, function(errupdate, resultupdate){
			    if(errupdate){
				res.status(400);
			    }
			    else {
				res.status(200);
			    }
			});
			res.status(200);
		    }
		    else {
			res.status(400);
		    }
		    res.status(200); 
		}
	    });
	})
};
