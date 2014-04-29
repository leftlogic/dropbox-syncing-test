var http = require('http');

var data;

var server = http.createServer(function (request, response) {
  if (request.method === 'POST') {
    var body = '';
    request.on('data', function (chunk) {
      body += chunk;
    });
    request.on('end', function () {
      data = body;
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end();
    });
  } else {
    response.write(data);
    response.end();
  }
});

server.listen(process.env.PORT);
