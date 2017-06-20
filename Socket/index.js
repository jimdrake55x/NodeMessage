var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection',function(socket){
    console.log('A User Connected');
    socket.on('disconnect', function(){
       console.log('A User has Disconnected'); 
    });
});

http.listen(3000,function(){
    console.log('Listening on Port 3000');
});