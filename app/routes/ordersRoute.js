var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    // to loop and insert multiple items
    var insertItem = function(iIdOrder, aItems, iCurrentIndex, fCallbackSuccess, fCallbackError) {
	if (!Array.isArray(aItems)) {
	    return fCallbackError(new Error('not an array'));
	}
	if (aItems.length <= iCurrentIndex) {
	    // there is no items anymore
	    return fCallbackSuccess();
	}
	var oItem = aItems[iCurrentIndex];
	var itemCommandQuery = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
	var itemCommandTable = ['photo_expresso_v1.order_items', 'ID_ORDER', 'FILE', 'ID_PAPER', 'ID_MASK', 'NUMBER_ITEMS',
				iIdOrder, oItem.file, oItem.id_paper, oItem.id_masque, oItem.number_items];

	itemCommandQuery = mysql.format(itemCommandQuery, itemCommandTable);
	connection.query(itemCommandQuery, function(err, resulItem){
	    if (err) {
		fCallbackError(err);
		return;
	    }
	    // the loop part
	    insertItem(iIdOrder, aItems, iCurrentIndex + 1,  fCallbackSuccess, fCallbackError);
	});
    }
    
    // to make loop and insert multiple destination
    var insertDestination = function(iIdOrder, aDestination, iCurrentIndex, fCallbackSuccess, fCallbackError) {
	if (!Array.isArray(aDestination)) {
	    return fCallbackError(new Error('not an array'));
	}
	if (aDestination.length <= iCurrentIndex) {
	    // there is no items anymore
	    return fCallbackSuccess();
	}

	var oDestination = aDestination[iCurrentIndex];
	var queryDestination = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	var tableDestination = ['photo_expresso_v1.order_destination', 'ID_ORDER', 'FIRSTNAME',
				'LASTNAME', 'ADDR_L1', 'ADDR_L2', 'POSTAL_CODE', 'CITY', 'COMPLEMENT',
				iIdOrder, oDestination.firstname, oDestination.lastname, oDestination.addr_l1,
				oDestination.add_l2, oDestination.postal_code, oDestination.city, oDestination.complement];
	
	queryDestination = mysql.format(queryDestination, tableDestination);
	connection.query(queryDestination, function(err, resultDestination){
	    if (err) {
		fCallbackError(err);
		return;
	    }
	    insertDestination(iIdOrder, aDestination, iCurrentIndex + 1,  fCallbackSuccess, fCallbackError);
	});
    }
        
    router.route('/orders/:id?')
        .post(function(req, res) {
	    
	    var decodeMail = jwtDecode(req.headers.authorization).ID_USER;
	    var queryMail = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?";
	    var tableMail = ['photo_expresso_v1.view_users_detail', 'ID_USER', decodeMail, 'IS_ARCHIVED', '0'];
	    
	    queryMail = mysql.format(queryMail, tableMail);
	    connection.query(queryMail, function(err, resultExist){
		if (err) {
                    res.status(400).send(err);
		    return;
		}
		if (resultExist.length == 0) {
		    res.status(404).send("Adresse mail ou mot de passe introuvable !");
		    return;
		}
		var decodeIdUser = jwtDecode(req.headers.authorization).ID_USER;
		var query = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES ('?', ?, ?, ?, ?)";
		var table = ['photo_expresso_v1.orders', 'ID_USER', 'NUMBER_PHOTO', 'PRICE', 'STATUS', 'DESTINATIONS_NUMBER',
			     decodeIdUser, req.body.nbr_photo, req.body.price, '0', req.body.destinations_number];
		    
		query = mysql.format(query, table);
		connection.query(query, function(err, result){
		    if (err) {
			res.status(400).send(err);
			return;
		    }
		  
		    var selectIdUser = jwtDecode(req.headers.authorization).ID_USER;
		    var querySelect = "SELECT ?? FROM ?? WHERE ?? = ? ORDER BY ?? DESC LIMIT 1";
		    var tableSelect = ['ID_ORDER' ,'photo_expresso_v1.orders', 'ID_USER', selectIdUser, 'ID_ORDER'];
		    
		    querySelect = mysql.format(querySelect, tableSelect);
		    connection.query(querySelect, function(err, resultSelect){
			if (err) {
			    res.status(400).send(err);
			    return;
			}
			var promoUsingQuery = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
			var promoUsingTable = ['photo_expresso_v1.code_promo_using', 'ID_CODE_PROMO', 'ID_ORDER',
					       req.body.code_promo, resultSelect[0].ID_ORDER];
			
			promoUsingQuery = mysql.format(promoUsingQuery, promoUsingTable);
			connection.query(promoUsingQuery, function(err, resultPromo){
			    if (err) {
				res.status(400).send(err);				    
				return;
			    }
			    insertItem(resultSelect[0].ID_ORDER, req.body.items, 0, function() {
				insertDestination(resultSelect[0].ID_ORDER, req.body.destinations, 0, function() {
				    res.status(201).send("Order created !");
				});
			    }, function(error) {
				res.status(400).send(err);				
			    }
				      );			    
			});
		    }, function(error) {
			res.status(400).send(err);
		    }
				    );
		});
	    });		    			
	})		


    
    .get(function(req, res){
	var iDUserDecode = jwtDecode(req.headers.authorization).ID_USER;
	var query = "SELECT * FROM ?? WHERE ?? = ?";
	var table = ['photo_expresso_v1.view_orders_detail', 'ID_USER', iDUserDecode ];
	
	query = mysql.format(query, table)
	connection.query(query, function(err, result){
	    if (err) {
		res.status(400).send(err);
		return;
	    }	    
	    res.send(result);	    
	});
    });
}
