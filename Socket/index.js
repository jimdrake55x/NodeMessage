var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/node_modules'));
app.use("/", express.static(__dirname + '/static'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/html/index.html');
});

io.on('connection',function(socket){
    io.emit('user connect','[INFO] : A new user has connected');
    socket.on('disconnect', function(){
       io.emit('user connect','[INFO] : A user has Disconnected'); 
    });
    socket.on('chat message',function(msg){
        console.log(msg);
        socket.broadcast.emit('chat message', msg);
  });
});
    

http.listen(3000,function(){
    console.log('Listening on Port 3000');
});