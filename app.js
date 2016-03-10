var server = require("./server");
var route = require("./routes/route");
global.Controller = require("./controller");

server.start(route);