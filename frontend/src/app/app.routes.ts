import { Routes } from '@angular/router';
import {InscriptionComponent} from "./inscription/inscription.component";
import {LoginComponent} from "./login/login.component";
import {ChatComponent} from "./chat/chat.component";

export const routes: Routes = [
  { path: 'signup', component: InscriptionComponent },
  { path: '', component: LoginComponent },
  { path: 'chat', component: ChatComponent},
];
