$(function(){
            var socket = io();
            
            $('form').submit(function(){
                var MessageToSend = CryptoJS.AES.encrypt($('#m').val(),$('#key').val());
                socket.emit('chat message',MessageToSend.toString());
                return false;
            });
            
            socket.on('chat message',function(msg){
                var RecievedMessage = CryptoJS.AES.decrypt(msg,$('#key').val()).toString(CryptoJS.enc.Utf8);
                $('#messages').append($('<li>').text(RecievedMessage));
            });
            
            socket.on('user connect',function(msg){
                $('#messages').append($('<li>').text(msg));
            });
            
        });