import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';

@Module({
  imports: [],
  providers: [SocketService]
})
export class SocketModule {}
