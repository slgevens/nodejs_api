var mysql = require('mysql');
var crypto = require('crypto');
var pass = require('password-hash');

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
	    var table = ['ID_USER', 'photo_expresso.login', 'MAIL', req.body.email ];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400);
		}		
		else {
		    if(result.length != 0) {
			// change password if the mail exists and cleaning token and token_validity
			var generatedPass = randompass(12);
			console.log(generatedPass);
			var hash =  pass.generate(generatedPass);

			console.log(pass.verify(generatedPass, hash ));
			var update_passsword = "UPDATE ?? SET ?? = ? WHERE ?";
			var table_update = ['photo_expresso.login', 'PASSWORD', pass.generate(generatedPass), result[0]];

			update_passsword = mysql.format(update_passsword, table_update);
			connection.query(update_passsword, function(err){
			    if(err)
				res.status(400);
			    else 
				res.status(201).send("Password reset !");
			});
		    } else {
			res.status(404).send("Nothing to show");
		    }
		}
	    });
	})
};
