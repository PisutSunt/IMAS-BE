import 'dart:io';

import 'package:socket_io_client/socket_io_client.dart';
const uri = 'http://localhost:3000';

void main() {
  // initial connection
  Socket chat = initializeConnection();

  // register socket
  chat.emit('storeClientInfo');
  print('ok');

  // start chat
  chat.on('startChat', (data) {
    print('start chat');
    chat.emit('toServer', {
      'message': 'hello! i am client',
      'destId': data,
    });
  });

  // chating and so on
  chat.on('toClient', (data) => print(data));
}

Socket initializeConnection() {
  Socket socket = io(uri, 
    OptionBuilder()
      .setTransports(['websocket']) // for Flutter or Dart VM
      .disableAutoConnect()  // disable auto-connection
      .build());
  socket.connect();
  return socket;
}