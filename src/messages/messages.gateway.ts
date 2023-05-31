import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('createMessage')
  async create(@MessageBody() message: CreateMessageDto): Promise<void> {
    await this.messagesService.create(message);
    this.server.emit('createMessage', message);
  }

  @SubscribeMessage('findAllMessages')
  async findAll() {
    const messages = await this.messagesService.findAll();
    this.server.emit('findAllMessages', messages);
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: string) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('updateMessage')
  update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  }

  @SubscribeMessage('removeMessage')
  remove(@MessageBody() id: string) {
    return this.messagesService.remove(id);
  }

  @SubscribeMessage('fetchSockets')
  async findAllClients(@MessageBody() client: Socket) {
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    this.server.emit("offline", {connected: client.connected, disconnected: client.disconnected, id: client.id});
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.server.emit("online", {connected: client.connected, disconnected: client.disconnected, id: client.id});
  }
}
