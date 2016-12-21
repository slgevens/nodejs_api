var mysql = require('mysql');
var jwtDecode = require('jwt-decode');

module.exports = function(router, connection) {
    router.route('/orders/:id?')
        .post(function(req, res){

	    var decodeIdUser = jwtDecode(req.headers.authorization).ID_USER;

	    var query = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES ('?', ?, ?, ?, ?)";
	    var table = ['photo_expresso_v1.orders', 'ID_USER', 'NUMBER_PHOTO', 'PRICE', 'STATUS', 'DESTINATIONS_NUMBER',
			 decodeIdUser, req.body.nbr_photo, req.body.price, '0', req.body.destinations_number];
	    
	    query = mysql.format(query, table);
	    connection.query(query, function(err, result){
		if (err) {
		    res.status(400).send(err);
		}
		else {
		    var selectIdUser = jwtDecode(req.headers.authorization).ID_USER;
		    var querySelect = "SELECT ?? FROM ?? WHERE ?? = ? ORDER BY ?? DESC LIMIT 1";
		    var tableSelect = ['ID_ORDER' ,'photo_expresso_v1.orders', 'ID_USER', selectIdUser, 'ID_ORDER'];

		    querySelect = mysql.format(querySelect, tableSelect);
		    connection.query(querySelect, function(err, resultSelect){
			if (err) {
			    res.status(400).send(err);
			}
			else {
			    var promoUsingQuery = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
			    var promoUsingTable = ['photo_expresso_v1.code_promo_using', 'ID_CODE_PROMO', 'ID_ORDER', req.body.code_promo, resultSelect[0].ID_ORDER];

			    promoUsingQuery = mysql.format(promoUsingQuery, promoUsingTable);
			    connection.query(promoUsingQuery, function(err, resultPromo){
				if (err) {
				    res.status(400).send(err);				    
				}
				else {							    
				    // multiple upload to handle
				    var itemCommandQuery = "INSERT INTO ?? (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
				    var itemCommandTable = ['photo_expresso_v1.order_items', 'ID_ORDER', 'FILE', 'ID_PAPER', 'ID_MASK', 'NUMBER_ITEMS', 
							    resultSelect[0].ID_ORDER, req.body.file, req.body.id_paper, req.body.id_masque, req.body.number_items];
				    itemCommandQuery = mysql.format(itemCommandQuery, itemCommandTable);
				    connection.query(itemCommandQuery, function(err, resulItem){
					if (err) {
					    res.status(400).send(err);
					}
					else {
					    // mutilple destination to do
					    var queryDestination = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
					    var tableDestination = ['photo_expresso_v1.order_destination', 'ID_ORDER', 'FIRSTNAME',
								    'LASTNAME', 'ADDR_L1', 'ADDR_L2', 'POSTAL_CODE', 'CITY', 'COMPLEMENT',
								    resultSelect[0].ID_ORDER, req.body.firstname, req.body.lastname, req.body.addr_l1,
								    req.body.add_l2, req.body.postal_code, req.body.city, req.body.complement];
					    
					    queryDestination = mysql.format(queryDestination, tableDestination);
					    connection.query(queryDestination, function(err, resultDestination){
						if (err) {
						    res.status(400).send(err);
						}
						else {
						    res.status(200);
						}
					    });
					}				    
				    });
				}
			    });
			}
		    });
		    res.status(201).send("Order created !");
		}
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
		}
		else {
		    res.send(result);
		}
	    });
	})
}
