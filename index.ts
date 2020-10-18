var app = require('express')();
var express = require('express');
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var connections = 0;
var rooms = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    connections += 1;
    console.log('there are ' + connections + ' users connected');
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        connections -= 1;
        console.log('there are ' + connections + ' users connected');
    });

    socket.on('attempt create', (roomName) => {
        if(rooms.indexOf(roomName) !== -1) {
            socket.emit('reject create', roomName);
        } else {
            socket.emit('accept create', roomName);
            rooms.push(roomName);
            socket.join(roomName);
            console.log('a user created room: ' + roomName);
        }
    });

    socket.on('attempt join', (roomName) => {
        if(rooms.indexOf(roomName) === -1) {
            socket.emit('reject join', roomName);
            console.log('a user attempted to join a non-existent room: ' + roomName);
        } else {
            socket.emit('accept join', roomName);
            socket.join(roomName);
            console.log('a user joined room: ' + roomName);
        }
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});