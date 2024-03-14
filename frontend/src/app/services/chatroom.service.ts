import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, switchMap} from "rxjs";
import {Chatroom} from "../models/chatroom.model";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

  constructor(
      private http: HttpClient
  ) { }

    createChatroom(user1: string, user2: string) {
      const url = "http://localhost:3000/api/chatroom/new";

      return this.http.post(url, {
          user1: user1,
          user2: user2
      });
    }

    getAllUserChatrooms(user_id: string) {
      const url = "http://localhost:3000/api/chatroom/userid";

      return this.http.post<any[]>(url, {
          user_id: user_id,
      }).pipe(
          switchMap(chatrooms => {
              const chatroomsObservables = chatrooms.map(
                  chatroom => new Chatroom(
                      chatroom._id,
                      chatroom.user1,
                      chatroom.user2
                  )
              );
              return forkJoin(chatroomsObservables)
          })
      )
    }
}
