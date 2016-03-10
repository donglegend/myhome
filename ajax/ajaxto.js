var User = require("../api/user");


var routes = {
	"/api/getuserinfo": User.getuserinfo,
	"/api/login": User.login
}



var ajaxto = function (req, res, formaturl){
	routes[formaturl.pathname](req, res, formaturl);
}

module.exports = ajaxto;