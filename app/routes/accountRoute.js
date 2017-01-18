var mysql     = require('mysql');
var pass      = require('password-hash');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/account/:id?')
	.put(function(req, res){
	    
	    var getIdUserDecodeCompte = jwtDecode(req.headers.authorization).ID_USER;
	    var queryUpdateAddr = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	    var tableUpdateAddr = ['photo_expresso_v1.login', 'ID_USER', getIdUserDecodeCompte, 'IS_ARCHIVED', '0'];
	    
	    queryUpdateAddr = mysql.format(queryUpdateAddr, tableUpdateAddr);
	    connection.query(queryUpdateAddr, function(err, resultExist){
		if (err) {
                    res.status(400).send(err);
		    return;
		}
		if (resultExist.length == 0) {
		    res.status(404).send("Adresse mail ou mot de passe introuvable !");
		    return;
		}		
		var decodeUserAddr = jwtDecode(req.headers.authorization).ID_USER;
                var queryUpdateUserAddr = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?"; 
		var tableUpdateUserAddr = ['photo_expresso_v1.users', 'ADDR_L1', req.body.addr_l1, 'ADDR_L2',
					   req.body.addr_l2, 'POSTAL_CODE', req.body.postal_code, 'CITY', req.body.city,
					   'COMPLEMENT', req.body.complement, 'ID_PAPER', req.body.id_paper, 'ID_MASK', req.body.id_mask, 'ID_USER', decodeUserAddr ];
		    
		queryUpdateUserAddr = mysql.format(queryUpdateUserAddr, tableUpdateUserAddr);
		connection.query(queryUpdateUserAddr, function(err, resultUpdate) {
		    if (err) {
			res.status(400).send(err);
			return;
		    } 
		    var decodeUserAddr = jwtDecode(req.headers.authorization).ID_USER;
		    var queryUpdatePassword = " UPDATE ?? SET ?? = ?";
		    var tableUpdatePassword = ['photo_expresso_v1.login', 'PASSWORD', pass.generate(req.body.password)];
		    
		    queryUpdatePassword = mysql.format(queryUpdatePassword, tableUpdatePassword);
		    connection.query(queryUpdatePassword, function(err, resultPassword){
			if (err) {
			    res.status(400).send(err);
			    return;
			}			
			res.send('Address updated !');
		    });		    
		});		
	    });
	})
    
	.get(function(req, res){
	    
	    var getIdUserDecodeCompte = jwtDecode(req.headers.authorization).ID_USER;
	    var queryGetCompte = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	    var tableGetCompte = ['photo_expresso_v1.view_users_detail', 'ID_USER', getIdUserDecodeCompte, 'IS_ARCHIVED', '0'];
	    
	    queryGetCompte = mysql.format(queryGetCompte, tableGetCompte);
	    connection.query(queryGetCompte, function(err, result){
		if (err) {
		    res.status(400).send(err);
		    return;
		}
		if (result.length == 0) {
		    res.status(404).send("Adresse mail ou mot de passe introuvable !");
		    return;
		}
		res.send(result);
	    });
	})    
};
