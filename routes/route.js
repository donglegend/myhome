var path = require("path");
var mine = require("../mine").types;


var TYPE_HTML = "html";
var UNKNOWN = "unknown";


function route(pathname, request, response){
	/**
	 * 默认访问index.html
	 * @param  {[type]} pathname [description]
	 * @return {[type]}          [description]
	 */
	if (pathname == "/" || pathname == "/views/"){
		pathname = "/views/index.html";
	}

	/**
	 * 处理访问文件的  类型
	 * @type {[type]}
	 */
	function onReponse(pathname, request, response){

		var ext = path.extname(pathname);
		ext = ext ? ext.slice(1) : UNKNOWN;
		// console.log(pathname,ext);
		var config = {
			pathname: pathname,
			contentType: mine[ext] || "text/plain",
			req: request,
			res: response
		}
		var __controller = new Controller(config);
		if(ext == UNKNOWN){
			__controller.ajax();
			return ;
		}else if(ext == TYPE_HTML){
			__controller.render();
			return ;
		}else{
			__controller.sendFile();
			return ;
		}
	}
	onReponse(pathname, request, response);
	
}

module.exports = route;
