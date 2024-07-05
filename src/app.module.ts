import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CustomTypeOrmModule } from './typeorm.config';
import { SocketModule } from './socket/socket.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UserModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
