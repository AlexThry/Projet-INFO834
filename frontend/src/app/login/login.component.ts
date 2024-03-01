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

}

