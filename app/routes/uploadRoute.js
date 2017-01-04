var multer  = require('multer')
var fileUpload = require('express-fileupload');
var upload = multer({ dest: '/home/evens/node-js_api/photos/' })

module.exports = function(router, connection) {
    router.route('/upload', upload.array('photos', 12))
	.post(function(req, res){

	    var query = "";
	    var table = "";
	    var sampleFile;
	    
	    
	    
	});
};

