$(function(){
            var socket = io();
            var userNickname = "Default";
            $('#messageForm').submit(function(){
                var Message = {message:$('#Message').val(), sender:userNickname};
                var MessageToSend = CryptoJS.AES.encrypt(JSON.stringify(Message),$('#MessageKey').val());
                socket.emit('chat message',MessageToSend.toString());
                $('#messages').append($('<li class="list-group-item">').text('You : ' + ($('#Message').val())));
                return false;
            });
    
            $('#nickname-save').click(function(){
                userNickname = $('#nickname-Name').val();
                $('#nickNameModal').modal('hide');
            });
            
            socket.on('chat message',function(msg){
                var RecievedMessage = CryptoJS.AES.decrypt(msg,$('#MessageKey').val()).toString(CryptoJS.enc.Utf8);
                RecievedMessage = JSON.parse(RecievedMessage);
                $('#messages').append($('<li class="list-group-item">').text(RecievedMessage.sender + ' : ' + RecievedMessage.message));
            });
            
            socket.on('user connect',function(msg){
                $('#messages').append($('<li class="list-group-item list-group-item-info">').text(msg));
            });
            
        });

$(window).on('load',function(){
    $('#nickNameModal').modal('show');
});