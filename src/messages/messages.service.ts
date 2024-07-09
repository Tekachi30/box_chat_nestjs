// messages.service.ts
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { WebSocketGateway } from '@nestjs/websockets';
import { Sign } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

@Injectable()
export class MessagesService {
  //{ name: 'Dat', text: 'Xin chao' }
  messages: Message[] = [];
  clientToUser = {};

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    try {
      const message = this.messageRepository.create({
        name: this.clientToUser[clientId],
        // name: createMessageDto.name,
        text: createMessageDto.text,
      });

      console.log(createMessageDto.name)

      await this.messageRepository.save(message);
      this.messages.push(message);

      console.log(message);
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  findOne(id: number) {
    // return `This action returns a #${id} message`;
    try {
      const exMessage = this.messages.find((msg) => msg.id === id);
      if (exMessage) {
        console.log(exMessage);
        return exMessage;
      } else {
        return {
          statusCode: 400,
          message: 'Tin nhắn không tồn tại',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    try {
      const messageIndex = this.messages.findIndex((msg) => msg.id === id);
      if (messageIndex < 0) {
        return {
          statusCode: 400,
          message: 'Tin nhắn không tồn tại',
        };
      } else {
        // cập nhật từng thuộc tính của tin nhắn
        const message = this.messages[messageIndex];
        if (updateMessageDto.text) {
          message.text = updateMessageDto.text;
        }
        console.log(`Đã cập nhật ${message}`);
        return message;
        // return {
        //   statusCode: 200,
        //   message: `Tin nhắn ${message} đã cập nhập`,
        // };
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    try {
      const messageIndex = this.messages.findIndex((msg) => msg.id === id);
      if (messageIndex < 0) {
        return {
          statusCode: 400,
          message: 'Tin nhắn không tồn tại',
        };
      } else {
        const removedMessage = this.messages.splice(messageIndex, 1)[0];
        console.log(`Đã xóa ${removedMessage}`);
        return removedMessage;
      }
    } catch (error) {
      console.log(error);
    }
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
