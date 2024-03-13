import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertComponent} from "../alert/alert.component";
import {NgIf} from "@angular/common";

class ngForm {
}

@Component({
  selector: 'app-inscription',
  standalone: true,
    imports: [
        FormsModule,
        AlertComponent,
        NgIf
    ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
    submit = false;
    errorConnexion : any | undefined;

    constructor(
        protected userService: UserService,
        protected router: Router
    ) {
    }

    signup(f: NgForm) {
        return this.userService.signup(f.value.email, f.value.password, f.value.username)
    }

    onSubmit(f: NgForm) {
        this.submit = true;
        this.errorConnexion = undefined;

        this.signup(f).subscribe((data) => {
            if (data.message == 'user_added') {
                this.router.navigateByUrl("/");
            }
        },
        error => {
            this.errorConnexion = error.error;
        })
    }
}
