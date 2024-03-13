import { Component } from '@angular/core';
import {UserService} from "../services/user.service";
import {FormsModule, NgForm} from "@angular/forms";
import {Router} from "@angular/router";

class ngForm {
}

@Component({
  selector: 'app-inscription',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
    constructor(
        protected userService: UserService,
        protected router: Router
    ) {
    }

    signup(f: NgForm) {
        return this.userService.signup(f.value.email, f.value.password, f.value.username)
    }

    onSubmit(f: NgForm) {
        this.signup(f).subscribe((data) => {
            if (data.message == 'user_added') {
                this.router.navigateByUrl("/");
            }
        })
    }
}
