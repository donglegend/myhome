var fs = require("fs");
var path = require("path");
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var template = require("art-template");
var AjaxTo = require("./ajax/ajaxto");

var Controller = (function (){


function handle_404(pathname, request, response){
	response.writeHead(404, {
        'Content-Type': 'text/plain'
    });

    response.write("This request URL " + pathname + " was not found on this server.");
    response.end();
}


function Controller(config){
	this.pathname = config.pathname || "";
	this.req = config.req;
	this.res = config.res;
	this.contentType = config.contentType;
}


var p = {
	isExist: function (pathname, cb){
		var self = this;
		fs.exists("."+pathname, function (exists){
			if(!exists){
				console.log("file not found");
				handle_404(pathname, self.req, self.res);
				return;
			}
			cb();
		})
	},
	render: function (){
		var self = this;
		var pathname = self.pathname;
		var request = self.req;
		var response = self.res;
		var contentType = self.contentType;
	
		self.isExist(pathname, function (){
			var basename = path.basename(pathname, '.html');

			// var hasfile = self.isExist(__dirname+"/../routes/"+basename+".js");
			var hasfile = fs.existsSync(__dirname+"/routes/"+basename+".js");
			var routeJs = hasfile ? "./routes/"+basename+".js" : "";
				
			var pageData = routeJs ? require(routeJs).data : {};
			
			var html = template.renderFile("."+pathname.replace(/\.html$/, ""), pageData);
			response.writeHead(200, {
				"Content-Type": contentType
			});
			response.write(html);
			response.end();
			return ;
		});
	},
	sendFile: function (){
		var self = this;
		var pathname = self.pathname;
		var request = self.req;
		var response = self.res;
		var contentType = self.contentType;


		self.isExist(pathname, function (){
			fs.readFile("."+pathname, "binary", function (err, data) {
			    if (err) {
			    	response.writeHead(500, {"Content-Type": "text/plain"});
			       	return response.end(err);
			    }
			    
			    response.writeHead(200, {
		            'Content-Type': contentType
		        });
			    response.write(data, "binary");
				response.end();
			});
			return;
		});
		
	},
	ajax: function (){
		var self = this;
		var pathname = self.pathname;
		var request = self.req;
		var response = self.res;
		var contentType = self.contentType;
		if(pathname.indexOf("api/") == -1){
			response.writeHead(200, {
		        'Content-Type': contentType
		    });
		    response.write("error!!!");
	    	response.end();
	    	return;
		}
		self.contentType = "application/json";
		response.writeHead(200, {
			'Content-Type': contentType
		});
		
		if(request.method == "GET"){
			var formatUrl = url.parse(request.url, true);

			AjaxTo(request, response, formatUrl);
		}else if(request.method == "POST"){
			var postdata = "";
			request.on("data", function (chunk){
				postdata += chunk;
			})
			request.on("end", function (){
				var formatUrl = url.parse(request.url, true);
				postdata = querystring.parse(postdata);
				formatUrl._postdata = postdata;
				AjaxTo(request, response, formatUrl);
			})
		}
	}
}

for(var k in p){
	Controller.prototype[k] = p[k];
}


return Controller;


})();

module.exports = Controller;