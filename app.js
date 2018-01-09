var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var list = ["Hip-fire only", "No ability use", "Parkinson's (constant screen shake", "Use ability non-lethally (if possible) on a teammate", "Rambo (first to peek, no slow peeking, always moving at least at walking pace)", "On attack, destroy all drones. On defense, destroy all cameras.", "Try, using any means, as hard as you can to get team killed by another player (can't inform voice chat)", "Can't shoot enemies (only abilites/grenades can harm)", "Secondary only", "Only auto reload (no manually pressing 'r')", "On attack, no breaking barricades. On defense, no reinforcing or ability placing.", "Actively disobey any command recieved from a teammate", "Throw the game in a creative manner (preferably involving teammates somehow)", "Mr. President a teammate for the entire game (not just round), and use yourself as a human shield", "Misinform teammates as much as possible", "Everything is your fault. Always apologise. (entire game)", "Hug the objective.", "SWEET FREEDOM!"];

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
		console.log("updating...");
		list = shuffle(list);
		data = {};
		data.challenge1 = list[0];
		data.challenge2 = list[1];
		io.emit('result', data);
	});
});

server.listen(8080, () => {
	console.log("listening on *:8080");
});