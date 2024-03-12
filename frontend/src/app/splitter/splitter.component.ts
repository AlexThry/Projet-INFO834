import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-splitter',
  standalone: true,
  imports: [],
  templateUrl: './splitter.component.html',
  styleUrl: './splitter.component.scss'
})
export class SplitterComponent {
    @Output() dragged = new EventEmitter<MouseEvent>();
    onMouseDown(event: MouseEvent) {
        this.dragged.emit(event);
    }
}
