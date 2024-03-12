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
    initialX!: number;
    initialWidth!: number;
    isDragging = false;

    onDrag(event: MouseEvent) {
        if (!this.isDragging) {
            this.isDragging = true;
            this.initialX = event.clientX;
            // @ts-ignore
            this.initialWidth = document.querySelector('.container').getBoundingClientRect().width;
        }

        const containerWidth = this.initialWidth + (event.clientX - this.initialX);
        // @ts-ignore
        document.querySelector('.container').setAttribute('style', `width: ${containerWidth}px`);

        // Empêcher la sélection de texte pendant le redimensionnement
        event.preventDefault();
    }

    stopDrag() {
        this.isDragging = false;
    }
}
