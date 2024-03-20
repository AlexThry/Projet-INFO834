import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { MessageService } from "../services/message.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {CommonModule, DatePipe, Location, NgClass, NgStyle} from "@angular/common";
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {filter} from "rxjs";
import {Chatroom} from "../models/chatroom.model";
import {ChatroomService} from "../services/chatroom.service";
import {io} from 'socket.io-client'


@Component({
  selector: "app-chat",
  standalone: true,
  imports: [CommonModule,DatePipe, NgStyle, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss",
})
export class ChatComponent {
    socket =  io('http://localhost:3000');

    correspondantId !: string;

    chatroom!: Chatroom;
    chatroomLoaded: boolean = false;

    messages : Message[] = [];
    messagesLoaded : boolean = false;

    @ViewChild('scroll') private myScrollContainer!: ElementRef;



    loggedUserId !: string;
    loaded : number = 100;
    correspondant !: User ;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected messageService: MessageService,
        protected authService: AuthService,
        protected userService: UserService,
        protected chatroomService: ChatroomService,
        private cdr: ChangeDetectorRef,

    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.loadChatroom();
            this.loadMessages();
        });
    }

    ngOnInit() {
        this.socket.on('message', data => {
            this.messages.push(
                new Message(
                    '0',
                    data.content,
                    data.senderId,
                    data.receiverId,
                    data.chatroomId,
                    new Date()
                )
            )
            this.scrollToBottom();
        })
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }

    loadChatroom() {
        this.socket.emit('leave_room')
        this.chatroomLoaded = false;
        if (this.route.snapshot.params["id"]) {
            this.correspondantId = this.route.snapshot.params["id"];
            this.chatroomService.createChatroom(localStorage.getItem("user_id")!, this.correspondantId).subscribe(
                chatroom => {
                    this.chatroom = chatroom;
                    this.socket.emit('join_room', this.chatroom.id)
                    this.loadMessages();
                    this.chatroomLoaded = true;
                }
            )
        }

        this.cdr.detectChanges();
    }

    loadMessages() {
        this.messagesLoaded = false;
        this.messages = []
        this.loggedUserId = localStorage.getItem("user_id")!;
        if (this.correspondantId) {
            this.userService.getUserById(this.correspondantId).subscribe(user => {
                this.correspondant = user;
                this.messageService.getMessagesFromChatroom(this.chatroom.id).subscribe(messages => {
                    this.messages = messages.reverse();
                    this.messagesLoaded = true;
                    this.scrollToBottom();
                })
            })
        }

        this.cdr.detectChanges();
    }

    onSubmitMessage(f: NgForm) {

        if (f.value.message != "" && f.value.message != undefined) {
            this.socket.emit('message', {
                content: f.value.message,
                senderId: this.loggedUserId,
                receiverId: this.correspondantId,
                chatroomId: this.chatroom.id
            })
            this.messageService
                .createMessage(
                    this.loggedUserId,
                    this.correspondantId,
                    this.chatroom.id,
                    f.value.message,
                )
            f.controls["message"].reset();
            this.scrollToBottom();
        }

    }

    getChatIsLoaded() {
        return this.chatroomLoaded && this.messagesLoaded;
    }

    protected readonly Date = Date;
    protected readonly DatePipe = DatePipe;
}
