import {ChangeDetectorRef, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AngularSplitModule } from 'angular-split';
import {io} from "socket.io-client";
import {filter} from "rxjs";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      CommonModule,
      RouterOutlet,
      LoginComponent,
      AngularSplitModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

    constructor(
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.redirectUnconnectedUser()
        });
    }

    redirectUnconnectedUser() {
        console.log(localStorage.getItem("user_id"))
        if (!localStorage.getItem("user_id")) {
            this.router.navigateByUrl("/")
        }
        this.cdr.detectChanges();

    }

    ngOnInit() {

    }
}
