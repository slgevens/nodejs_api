// Initialisation des dépendances
var mysql      = require('mysql');
var express    = require('express');
var bodyParser = require('body-parser');
var cors       = require('cors');

// A enlever si jamais tu ne veux pas utiliser Oauth
var jwt        = require('jsonwebtoken');
// on lui donne le fichier d'environement à configurer
require('dotenv').config({path: process.env.HOME + '/.env' });

// on ajoute express qui nous servira d'api
var app = express();
var connection;

function handleDisconnect() {
    connection = mysql.createConnection({
      	host     : process.env.DB_HOST,
      	user     : process.env.DB_USER,
      	password : process.env.DB_PASSWORD,
      	database : process.env.DB,
      	port     : process.env.DB_PORT,
        // à enlever Une fois le mode débug terminé
      	debug    :  true
    });

    // Best practice, si jamais la base est off le serveur va tenter de se reconnecter
    connection.connect(function(err) {
      	if(err) {
      	    setTimeout(handleDisconnect, 2000);
      	}
    });

    // Si jamais on perd la connection on demande a node de se reconnecter
    connection.on('error', function(err) {
        	if (err.code === 'PRROTOCOL_CONNECTION_LOST') {
        	     // si jamais la connection subit un probleme
        	     handleDisconnect();
        	} else {
        	    throw err;
        	}
    });
}

// appel de la fonction
handleDisconnect();


// Cors très important !
app.use(cors());

// bodyParser sert a définir le type de donnée qu'on souhaite recevoir et envoyer.
// Ce cas signifique qu'on Recoit des données de type JSON a cause de la variable 'extended' et une limitation a 5mo par requete
app.use(bodyParser.json({ extended: true, limit: '5mb' }));
// Ce cas signifique qu'on Envoie des donnée de type JSON avec une limitation de 5mo par requete
app.use(bodyParser.json({ limit: '5mb' }));

// ON initialise le port à utiliser et ON dit a express d'instancier le router
var port   = process.env.PORT || 3000;
var router = express.Router();

// On autoriste suelement l'access API au login, attention, ne pas mettre le fichier Js, par exemple loginRoute.js
require('./app/routes/oublieRoute')(router, connection);
require('./app/routes/inscriptionRoute')(router, connection);
//require('./app/routes/loginRoute')(router, connection);
require('./app/routes/papierRoute')(router, connection);
require('./app/routes/masqueRoute')(router, connection);
require('./app/routes/promoRoute')(router, connection);


// Si tu n'utilises pas 0auth, Alors Enleve cette partie
router.use(function(req, res, next) {
    // check header url if token exist
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization;

    // Si jamais le toke existe, alors on lui demande
    if (token) {
        var removed_bearer = token.replace("Bearer ", '')
        jwt.verify(removed_bearer, 'token_secret', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if no token has been send, show an error
        return res.status(403).send({
            success: false,
            message: "wrong realm :'("
        });
    }
});
//require('./app/routes/commandesRoute')(router, connection);
//require('./app/routes/accountsRoute')(router, connection);

// Ici sont les Routes si jamais il ont besoin d'etre authentifié pour etre utilisé
// si jamais tu veux creer une route, fait un require

// On dit à Express que notre route s'apelle http://xx.xx/api/...
app.use('/api', router);

// On lui dit d'écouter sur le port 3000
app.listen(port);
