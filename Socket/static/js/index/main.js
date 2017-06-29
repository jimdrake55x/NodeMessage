$(function(){
            var socket = io();
            
            $('form').submit(function(){
                var MessageToSend = CryptoJS.AES.encrypt($('#Message').val(),$('#MessageKey').val());
                socket.emit('chat message',MessageToSend.toString());
                $('#messages').append($('<li class="list-group-item">').text(($('#Message').val())));
                return false;
            });
            
            socket.on('chat message',function(msg){
                var RecievedMessage = CryptoJS.AES.decrypt(msg,$('#MessageKey').val()).toString(CryptoJS.enc.Utf8);
                $('#messages').append($('<li class="list-group-item">').text(RecievedMessage));
            });
            
            socket.on('user connect',function(msg){
                $('#messages').append($('<li class="list-group-item list-group-item-info">').text(msg));
            });
            
        });

$(window).on('load',function(){
    $('#nickNameModal').modal('show');
});