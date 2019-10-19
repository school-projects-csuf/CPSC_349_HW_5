var http = require('http');
var fs = require('fs'); // similar to fstream in c++, but here it means filesystem, its similar because this is required to be '#include'd in order to read files
var extract = require('./extract');
var wss = require('./websockets-server');
const mime = require('mime');

var handleError = function(err, res) {
  res.writeHead(404, {
    'Content-Type': 'text/html'
  });
  res.end('<meta http-equiv="Refresh" content="0; url=error.html" />');//put error html somehow here
}

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.end(data);
    }
  });

  var getMime = mime.getType(filePath)
  console.log('MIME Type is: ' + getMime);

});
server.listen(3000);
