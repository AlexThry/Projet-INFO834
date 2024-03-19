export class Message {
  id!: string;
  content!: string;
  sender_id!: string;
  receiver_id!: string;
  chatroom_id!: string;
  timestamp!: Date;

  constructor(
    id: string,
    content: string,
    sender_id: string,
    receiver_id: string,
    chatroom_id: string,
    timestamp: Date,
  ) {
    this.id = id;
    this.content = content;
    this.sender_id = sender_id;
    this.receiver_id = receiver_id;
    this.chatroom_id = chatroom_id;
    this.timestamp = timestamp;
  }
}
