$(function(){
            var socket = io();
            var userNickname = "Somebody...";
            

            // Sending a Message
            $('#messageForm').submit(function(){

                var Message = {message:$('#Message').val(), sender:userNickname};
                var MessageToSend = CryptoJS.AES.encrypt(JSON.stringify(Message),$('#MessageKey').val());
                
                socket.emit('chat message',MessageToSend.toString());

                $('#messages').append($('<div class="row list-group-item">')
                                .append($('<div class="col-md-1">')
                                        .text("You :"))
                                .append($('<div class="col-md-11">')
                                    .append(markdown.toHTML(Message.message))));
                
                //Resetting Message Box
                $('#Message').val('');

                //Autoscroll to bottom
                $(document).scrollTop($(document).height());

                //Preventing Callback
                return false;
            });

            //Saving Nickname
            $('#nickname-save').click(function(){
                userNickname = $('#nickname-Name').val();
                $('#nickNameModal').modal('hide');
            });
            
            //Recieving a Message
            socket.on('chat message',function(msg){
                var RecievedMessage = CryptoJS.AES.decrypt(msg,$('#MessageKey').val()).toString(CryptoJS.enc.Utf8);
                RecievedMessage = JSON.parse(RecievedMessage);

                $('#messages').append($('<div class="row list-group-item">')
                    .append($('<div class="col-md-1">')
                        .text(RecievedMessage.sender + ' :'))
                    .append($('<div class="col-md-11">')
                        .append(markdown.toHTML(RecievedMessage.message))));
            });
            
            //Receiving a user connect event. 
            socket.on('user connect',function(msg){
                $('#messages').append($('<div class="row list-group-item list-group-item-info">').text(msg));
            });
        });


//Allowing the user to chose a nickname. 
$(window).on('load',function(){
    $('#nickNameModal').modal('show');
});