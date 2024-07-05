import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { io, Socket } from 'socket.io-client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class SocketService implements OnModuleInit {
  public socketClient: Socket;
  constructor() {
    this.socketClient = io('http://localhost:3000');
  }

  // @WebSocketServer()
  // server: Server;

  onModuleInit() {
    this.registerConsumerEvents();
  }

  private registerConsumerEvents() {
    // this.socketClient.emit('newMessage', {msg: 'Ê thằng kia'})
    this.socketClient.on('connect', () => {
      console.log('Connected đến Gateway');
    });
    this.socketClient.on('onMessage', (payload: any) => {
      console.log(payload);
    });
  }

  // @SubscribeMessage('newMessage')
  // onNewMessage(@MessageBody() body: any) {
  //   console.log(body);
  //   this.server.emit('onMessage', {
  //     msg: 'New Message',
  //     content: body,
  //   });
  // }
}
