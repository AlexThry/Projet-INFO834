import { Component } from '@angular/core';
import {ConversationsComponent} from "../conversations/conversations.component";
import {ChatComponent} from "../chat/chat.component";
import { AngularSplitModule } from 'angular-split';
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [
        ConversationsComponent,
        ChatComponent,
        AngularSplitModule,
    ],
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
