import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drag-sizer',
  templateUrl: './drag-sizer.component.html',
  styleUrls: ['./drag-sizer.component.scss']
})
export class DragSizerComponent {
  @Input() xOffset = 0;
  @Input() yOffset = 0;
  @Output() xPos = new EventEmitter<number>();
  @Output() yPos = new EventEmitter<number>();

  private dragging = false;

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
  }

  @HostListener('mousedown')
  onMouseDown() {
    this.dragging = true;
    return false; // Call preventDefault() on the event
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging) {
      this.xPos.emit(Math.max(8, event.clientX - this.xOffset));
      this.yPos.emit(Math.max(8, event.clientY - this.yOffset));
    }
  }
}
