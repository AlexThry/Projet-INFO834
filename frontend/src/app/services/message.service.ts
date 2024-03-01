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
  ) {
  }
}
