import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, forkJoin, map, switchMap, throwError} from "rxjs";
import {Chatroom} from "../models/chatroom.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {

    constructor(
      private http: HttpClient
    ) { }

    createChatroom(user1: string, user2: string) {
      const url = "http://localhost:3000/api/chatroom/new";

      return this.http.post<any>(url, {
          user1: user1,
          user2: user2
      }).pipe(
          map(chatroom => new Chatroom(
              chatroom._id,
              chatroom.user1,
              chatroom.user2
          ))
      )
    }
    getAllUserChatrooms(user_id: string) {
        const url = `http://localhost:3000/api/chatroom/userid`;

        return this.http.post<any>(url, {user_id: user_id})
            .pipe(
                map((data: any) => data.map((chatroom: any) => {
                    return new Chatroom(
                        chatroom._id,
                        chatroom.user1,
                        chatroom.user2,
                    )
                }
                )),
                catchError((error: HttpErrorResponse) => {
                    console.error('Error fetching chatrooms:', error);
                    return throwError(error);
                })
            );
    }

    getChatroomByUsersIds(user1: string, user2: string) {
        const url = `http://localhost:3000/api/chatroom/conv`;

        return this.http.post<any>(url, {
            user1: user1,
            user2: user2
        }).pipe(
            map(chatroom => {
                if (chatroom) {
                    new Chatroom(
                        chatroom._id,
                        chatroom.user1,
                        chatroom.user2
                    )
                }
            })
        )
    }
}
