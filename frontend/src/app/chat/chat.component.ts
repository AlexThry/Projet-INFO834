import { Component, ElementRef, Input } from "@angular/core";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { MessageService } from "../services/message.service";
import { ActivatedRoute, Router } from "@angular/router";
import {CommonModule, DatePipe, Location, NgClass, NgStyle} from "@angular/common";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: "app-conversation",
  standalone: true,
  imports: [CommonModule,DatePipe, NgStyle, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent {
  messageList!: Message[];
  connectedUser!: User;
  correspondent!: User;
  loaded: number = 10;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location,
    private elementRef: ElementRef,
    private authService: AuthService
  ) {}

    ngOnInit() {
      let userId = sessionStorage.getItem("user_id");
        // @ts-ignore
        this.authService.getUserLoggedIn$().subscribe(
            user => {
                console.log(user as User);
            }
        )
    }

  // ngOnInit() {
  //   this.authService.getUserLoggedIn$().subscribe((user) => {
  //     this.connectedUser = user as User;
  //     this.userService
  //       .getUserById(this.route.snapshot.params["id"])
  //       .subscribe((user) => {
  //         this.correspondent = user as User;
  //         this.messageService
  //           .getMessagesFromUsersIdsFromLimit(
  //             this.connectedUser.id,
  //             this.correspondent.id,
  //             0,
  //             this.loaded,
  //           )
  //           .subscribe((messages) => {
  //             this.messageList = messages;
  //             console.log(this.messageList);
  //           });
  //       });
  //   });
  //
  //   setTimeout(() => {
  //     const textareas: NodeListOf<HTMLTextAreaElement> =
  //       this.elementRef.nativeElement.querySelectorAll("textarea");
  //     textareas.forEach((textarea: HTMLTextAreaElement) => {
  //       textarea.setAttribute(
  //         "style",
  //         "height:" + textarea.scrollHeight + "px;overflow-y:hidden;",
  //       );
  //     });
  //
  //     textareas.forEach((textarea: HTMLTextAreaElement) => {
  //       textarea.addEventListener("input", function () {
  //         this.style.height = "auto";
  //         this.style.height = this.scrollHeight + "px";
  //       });
  //     });
  //   }, 10);
  // }
  //
  // goBack() {
  //   this.location.back();
  // }
  //
  // onSubmitMessage(f: NgForm) {
  //   if (f.value.message != "" && f.value.message != undefined) {
  //     this.messageService
  //       .createMessage(
  //         this.connectedUser.id.toString(),
  //         this.correspondent.id.toString(),
  //         f.value.message,
  //       )
  //       .subscribe(() => {
  //         this.messageService
  //           .getMessagesFromUsersIdsFromLimit(
  //             this.connectedUser.id,
  //             this.correspondent.id,
  //             0,
  //             10,
  //           )
  //           .subscribe((messages) => {
  //             this.messageList = messages;
  //           });
  //       });
  //   }
  //   f.controls["message"].reset();
  // }
  // isFirstMessag(message: Message) {
  //   return message == this.messageList[0];
  // }
}
