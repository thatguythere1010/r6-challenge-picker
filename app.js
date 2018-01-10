var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI('3cc5c6cbd8d898bcce52a24796713011');

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var list = ["ERROR", "ERROR"]

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/files/index.html');
});

io.on('connection', function(socket) {
	socket.on('generateNew', function() {
		console.log("Generating new...");
		pastebin.getPaste('ZcV7pqsR').then(function(paste) {
			list = shuffle(paste.split("\n"));
			data = {};
			data.challenge1 = list[0];
			data.challenge2 = list[1];
			io.emit('result', data);
		}).error(function(err) {
			console.log("Error caught!");
		});
	});
});

server.listen(server_port, () => {
	console.log(`Listening on ${server_ip_address}:${server_port}!`);
});