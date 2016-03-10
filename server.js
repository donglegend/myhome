var http = require("http");
var url = require("url");

var PORT = 8888;

function start(route) {

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    route(pathname, request, response);
  }
  http.createServer(onRequest).listen(PORT);
  console.log("Server has started.");
}

exports.start = start;