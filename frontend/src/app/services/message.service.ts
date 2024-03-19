import { Injectable } from "@angular/core";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { Message } from "../models/message.model";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root",
})
export class MessageService {
    constructor(
        private http: HttpClient,
        private userService: UserService,
    ) {}

    createMessage(
            senderId: string,
            receiverId: string,
            chatroomId: string,
            content: string
        ) {
        const url = `http://localhost:3000/api/message/add`;
        return this.http.post(url, {
            "sender_id": senderId,
            "receiver_id": receiverId,
            "chatroom_id": chatroomId,
            "content": content,
        });
    }

    getMessagesFromChatroom(chatroomId: string) {
        const url = `http://localhost:3000/api/message/chatroom`;

        return this.http.post<any>(url, {
            chatroom_id: chatroomId
        })
    }

}
