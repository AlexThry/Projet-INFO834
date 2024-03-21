import { Injectable } from "@angular/core";
import { forkJoin, map, Observable, switchMap } from "rxjs";
import { Message } from "../models/message.model";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import {log} from "node:util";

@Injectable({
    providedIn: "root",
})
export class MessageService {
    private baseUrl = "https://web-chat-app-server.azurewebsites.net/api";

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
        const url = `${this.baseUrl}/message/add`;
        return this.http.post(url, {
            "sender_id": senderId,
            "receiver_id": receiverId,
            "chatroom_id": chatroomId,
            "content": content,
        }).subscribe(message => console.log(message))
    }

    getMessagesFromChatroom(chatroomId: string) {
        const url = `${this.baseUrl}/message/chatroom`;

        return this.http.post<any>(url, {
            chatroom_id: chatroomId
        })
    }

}
