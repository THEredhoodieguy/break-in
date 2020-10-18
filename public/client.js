var socket = io();

$('#create-form').submit(function(e) {
    e.preventDefault();
    socket.emit('attempt create', $('#create-input').val());
    return false;
});

socket.on('reject create', function(msg) {
    alert('A room with the name: ' + msg + ' already exists, please choose another');
});

socket.on('accept create', function(msg) {
    $('#create-form').hide();
    $('#join-form').hide();
    $('#canvas').show();
});

$('#join-form').submit(function(e) {
    e.preventDefault();
    socket.emit('attempt join', $('#join-input').val());
    return false;
});

socket.on('reject join', function(msg) {
    alert('A room with the name: ' + msg + ' does not exist, choose another or create one');
});

socket.on('accept join', function(msg) {
    $('#create-form').hide();
    $('#join-form').hide();
    $('#canvas').show();
});