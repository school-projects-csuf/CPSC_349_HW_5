var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;6
var ws = new WebSocketServer( {
  port: port
});
var messages = [];

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');

  messages.forEach(function(msg) {
    socket.send(msg);
  });


  socket.on('message', function(data) {
    console.log('message received: ' + data);
    if (data.substring(0, 6) === '/topic') {
      ws.clients.forEach(function(clientSocket) {
        clientSocket.send('*** Topic is \'' + data.substring(7) + '\'')
      });
      messages.unshift('*** Topic is \'' + data.substring(7) + '\'');
    }

    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data)
    });
  });
});
