const http = require('http');

const routes = require('./routes.js');

const server = http.createServer(routes);

server.listen(1010);//port that it will listen to


