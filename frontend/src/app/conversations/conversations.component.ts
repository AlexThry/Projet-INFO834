import {ChangeDetectorRef, Component} from "@angular/core";
import { MessageService } from "../services/message.service";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { Message } from "../models/message.model";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import { UserService } from "../services/user.service";
import { Location, NgClass, NgStyle } from "@angular/common";
import {filter, forkJoin} from "rxjs";
import {AlertComponent} from "../alert/alert.component";
import {ChatroomService} from "../services/chatroom.service";
import {Chatroom} from "../models/chatroom.model";
import {subscribe} from "node:diagnostics_channel";
import {UserPageComponent} from "../user-page/user-page.component";
import {io} from "socket.io-client";

@Component({
    selector: "app-conversations",
    standalone: true,
    imports: [RouterLink, NgStyle, NgClass, AlertComponent, UserPageComponent],
    templateUrl: "./conversations.component.html",
    styleUrl: "./conversations.component.scss",
})
export class ConversationsComponent {
    socket = io("http://localhost:3000")

    userChatrooms: Chatroom[] = [];
    userChatroomsLoaded: boolean = false;

    correspondants: User[] = [];
    correspondantsLoaded: boolean = false;

    loggedUser !: User;
    loggedUserLoaded : boolean = false;

    connectedUsers : User[] = [];
    connectedUsersLoaded: boolean = false;

    allUsers: User[] = [];
    allUsersLoaded: boolean = false;



    constructor(
        protected userService: UserService,
        protected chatroomService: ChatroomService,
        private router: Router,
        private cdr: ChangeDetectorRef,

    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            // Rechargez le composant ici
        });
    }

    ngOnInit() {
        this.loadUser();
        this.loadUserChatrooms()

        this.socket.on("user_login", userId => {
            this.userService.getUserById(userId).subscribe(user => this.connectedUsers.unshift(user));
        })

        this.socket.on("user_logout", userId => {
            this.connectedUsers = this.connectedUsers.filter(user => user.id !== userId);
        })
    }

    addCorrespondant(user: User) {
        for (let correspondant of this.correspondants) {
            if (correspondant.id === user.id) {
                return
            }
        }
        this.correspondants.unshift(user);
    }

    setFirstCorrespondant(correspondant: User) {
        this.correspondants.sort((a, b) => a.id === correspondant.id ? -1 : b.id === correspondant.id ? 1 : 0);
    }


    loadUserChatrooms() {
        this.chatroomService.getAllUserChatrooms(localStorage.getItem("user_id")!).subscribe(
            chatrooms => {
                this.userChatrooms = chatrooms;
                this.userChatroomsLoaded = true;
                this.loadCorrespondants(this.userChatrooms)
            }
        )
    }

    loadCorrespondants(chatrooms: Chatroom[]) {
        let correspondants: User[] = []
        for (let chatroom of chatrooms) {
            const userId = chatroom.user1 == localStorage.getItem("user_id") ? chatroom.user2 : chatroom.user1
            this.userService.getUserById(userId).subscribe(user => {
                correspondants.push(user);
            })
        }
        this.correspondants = correspondants;
        this.correspondantsLoaded = true
    }

    loadUser() {
        this.userService.getUserById(localStorage.getItem("user_id")!).subscribe(
            user => {
                this.loggedUser = user
                this.loggedUserLoaded = true;
                this.loadAllUsers()
                this.loadConnectedUsers();
            }
        )
    }

    logout() {
        this.userService.logout()
        this.socket.emit("user_logout", localStorage.getItem("user_id"))
        this.router.navigateByUrl("").then(() => {
            localStorage.removeItem("user_id")
        })
    }

    loadConnectedUsers() {
        this.userService.getConnectedUsers().subscribe(
            usersIds => {
                for (let userId of usersIds) {
                    this.userService.getUserById(userId).subscribe(user => {
                        if (user.id != this.loggedUser.id) {
                            this.connectedUsers.push(user)
                        }
                    })
                }
                this.connectedUsersLoaded = true;
            }
        )
    }

    loadAllUsers() {
        this.userService.getAllUsers().subscribe(
            users => {
                for (let user of users) {
                    if (user.id != this.loggedUser.id) {
                        this.allUsers.push(user);
                    }
                }
                this.allUsersLoaded = true;
            }
        )
    }

    getConversationsLoaded() {
        return this.correspondantsLoaded && this.userChatroomsLoaded && this.loggedUserLoaded;
        // return true;
    }

    getConnectedUsersLoaded() {
        return this.connectedUsersLoaded;
    }

    getAllUsersLoaded() {
        return this.allUsersLoaded;
    }

    protected readonly localStorage = localStorage;
}
