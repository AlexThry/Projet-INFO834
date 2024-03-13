import {Component} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {User} from "../models/user.model";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        RouterLink,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    submit: boolean = false;
    isLoading !: boolean;
    userConnected!: User;
    errorLogin !: any | undefined;

    constructor(
        private router: Router,
        protected authService: AuthService

    ) {}

    onSubmit(f: NgForm) {

        this.errorLogin = undefined;
        this.submit = true;
        this.isLoading = true;


        if (f.value.email != "" && f.value.email != undefined && f.value.password != "" && f.value.password != undefined) {
            this.authService.login(f.value.email, f.value.password)
                .subscribe
                (user => {
                    if (user) {
                        this.userConnected = user;
                        localStorage.removeItem("user_id");
                        localStorage.setItem("user_id", user.id);
                        this.router.navigateByUrl("/chat/65d7074dddb4b24c2dab31f3");
                    }
                    },
                    error => {
                        console.error('Erreur lors de la connexion :', error.error.message);
                        this.errorLogin = error.error;
                    })

        } else {
            console.log("prout")
        }
    }
}

