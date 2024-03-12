import { Component } from "@angular/core";
import { MessageService } from "../services/message.service";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { Message } from "../models/message.model";
import {Router, RouterLink} from "@angular/router";
import { UserService } from "../services/user.service";
import { Location, NgClass, NgStyle } from "@angular/common";
import {forkJoin} from "rxjs";

@Component({
    selector: "app-conversations",
    standalone: true,
    imports: [RouterLink, NgStyle, NgClass],
    templateUrl: "./conversations.component.html",
    styleUrl: "./conversations.component.scss",
})
export class ConversationsComponent {
    conversationsUsers !: User[];
    allUsers !: User[];
    connectedUsers !: User[];
    loggedUser !: User;



    constructor(
        protected authService: AuthService,
        protected messageService: MessageService,
        protected userService: UserService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.authService.getUserLoggedIn().subscribe(loggedUser => {
            if (loggedUser) {
                this.loggedUser = loggedUser;
                this.messageService.getConversationList(loggedUser.id).subscribe(conversations => {
                    const userObservables = [];
                    for (let message of conversations) {
                        console.log(message)
                        if (message.sender_id == this.loggedUser.id) {
                            userObservables.push(this.userService.getUserById(message.receiver_id));
                        } else {
                            userObservables.push(this.userService.getUserById(message.sender_id));
                        }
                    }
                    forkJoin(userObservables).subscribe(users => {
                        this.conversationsUsers = users;
                    });
                })
            } else {
                console.log("pas d'utilisateur connecté")
            }
        })

        this.userService.getConnectedUsers().subscribe(usersIds => {
            let userObservables = [];
            for (let userId of usersIds) {
                userObservables.push(this.userService.getUserById(userId));
            }
            forkJoin(userObservables).subscribe(users => {
                this.connectedUsers = users;
            });
        });

        this.userService.getAllUsers().subscribe(users => {
            this.allUsers = users;
        })
    }

    logout() {
        this.userService.logout()
        this.router.navigateByUrl("").then(() => {
            localStorage.removeItem("user_id")
        })
    }

    conversationsLoaded() {
        return (this.conversationsUsers != undefined && this.connectedUsers != undefined)
    }
}
