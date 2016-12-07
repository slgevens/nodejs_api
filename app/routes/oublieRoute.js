var mysql = require('mysql');
var crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'n36WYSqh');

var passwordHash = require('password-hash');

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
		    res.status(400);
		}		
		else {
		    if(result.length != 0) {
			// change password if the mail exists and cleaning token and token_validity
//			var passwordAlgorithm = passwordHash.algorithm ('md5');
			var hashedpassword = passwordHash.generate('evens');
			hmac.update('some data to hash');
			console.log(hmac.digest('hex'));
			console.log(hashedpassword);
			var update_passsword = "UPDATE ?? SET ?? = ? WHERE ?";
			var table_update = ['photo_expresso.login', 'PASSWORD', randompass(10), result[0]];

			
			
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
