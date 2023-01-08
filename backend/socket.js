const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client => {
  client.on('event', data => { console.log('hello') });
  client.on('disconnect', () => { console.log('kolla life') });
});
server.listen(3000);