var app = require('express')();
var http = require('http').Server(app);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/html/index.html');
});

http.listen(3000,function(){
    console.log('Listening on Port 3000');
});