var mysql  = require('mysql');
var crypto = require('crypto');
var pass   = require('password-hash');
var nodemailer = require('nodemailer');

module.exports = function(router, connection) {
    router.route('/forget')
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
	    var query = "SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?";
	    var table = ['ID_USER', 'photo_expresso_v1.login', 'IS_ARCHIVED', '0', 'MAIL', req.body.email];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400);
		}		
		else {
		    if(result.length != 0) {
			var generatedPass = randompass(12);
			var hash =  pass.generate(generatedPass);
			var transporter = nodemailer.createTransport({
			    service: 'Gmail', auth: {
				user: 'fsocietyestiam@gmail.com',
				pass: 'lewegudrom'
			    }
			});
			var mailOptions = {
			    from: 'Fsociety ESTIAM',
			    to: req.body.email,
			    subject : 'Here is your new password',
			    html: "<h4>Hello !</h4> <br/><b>Here is your new password : </b><b>" + generatedPass + "</b><p> Don't forget to change it !</p> <p>Have a great day </p>--</br><h4>Fsociety Team</h4>"
			};
			var update_passsword = "UPDATE ?? SET ?? = ? WHERE ?";
			var table_update = ['photo_expresso_v1.login', 'PASSWORD', pass.generate(generatedPass), result[0]];
			update_passsword = mysql.format(update_passsword, table_update);
			connection.query(update_passsword, function(err){
			    if(err) {
				res.status(400);
			    }else {
				transporter.sendMail(mailOptions, function(err, info){
				    if(err) {
					res.status(400);
				    } else {
					res.send("Password reset !");
				    }
				});
			    }
			});		
		    } else {
			res.status(404).send("Nothing to show");
		    }
		}
	    });
	})    
};
