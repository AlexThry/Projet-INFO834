import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AngularSplitModule } from 'angular-split';
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
    constructor(private router: Router) {
    }
}
