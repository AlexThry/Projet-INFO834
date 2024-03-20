import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})

export class UserPageComponent {
    submit = false;
    userConnected!: User;
    firstUsername!:String;
    firstEmail!:String;
    constructor(protected userService: UserService,
                protected connexionService: AuthService) {}

    ngOnInit(): void {
        this.connexionService.getUserLoggedIn().subscribe(user => {
            this.userConnected = user as unknown as User;
            // @ts-ignore
            this.firstUsername = this.userConnected.username;
            // @ts-ignore
            this.firstEmail = this.userConnected.email;
        });
    }

    onSubmit(lf: NgForm) {

        this.submit = true;

        //modification username
        if(lf.value.username != this.firstUsername){
            this.userService.updateUsername(this.userConnected.id,lf.value.username).subscribe()
            console.log("test")
        }

        //modification email
        if(lf.value.email != this.firstEmail){
            this.userService.updateEmail(this.userConnected.id,lf.value.email).subscribe()
        }

        //modification password
        if(lf.value.password != ""){
            this.userService.updatePassword(this.userConnected.id,lf.value.password).subscribe()
        }

    }
}
