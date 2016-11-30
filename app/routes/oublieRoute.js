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
		    res.status(400);
		    console.log('11111111111111111111111111111111111111111111111111');
		}		
		else {
		    console.log(result);
		    if(result.length != 0) {
			console.log('22222222222222222222222222222222222222222222222')
			// change password if the mail exists and cleaning token and token_validity
			var new_token = '';
			var update_passsword = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
			var table_update = ['photo_expresso.login', 'PASSWORD', randompass(10), 'TOKEN', new_token,
					    'TOKEN_VALIDITY', new_token, 'ID_LOGIN', result[0] ];
			update_passsword = mysql.format(update_passsword, table_update);

			connection.query(update_passsword, function(err, result2){
			    if(err){
				console.log('33333333333333333333333');
			    res.status(400);
			}
			    else {
				console.log('44444444444444444444444');
			    res.status(200);
			}
			});
		    } else {
			res.status(404).send("Nothing to show");
		    }
		}
	    });
	})
};
