import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TasksContainerService } from '../tasks-container.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  @Output() mediateToggleEditModeEvent = new EventEmitter<boolean>();

  constructor(public container: TasksContainerService) {}

  ngOnInit(): void {}

  dragEnterHandler(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add('draggedover');
  }

  dragLeaveHandler(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.remove('draggedover');
  }

  dropHandler(event: DragEvent) {
    let target = event.target as HTMLElement;
    target.classList.remove('draggedover');
    while (target && target.parentElement && target.nodeName !== 'UL') {
      target = target.parentElement;
    }
    if (target.id === 'done-tasks') {
      this.container.markTaskDone(+event.dataTransfer?.getData('text/plain')!);
    } else if (target.id === 'pending-tasks') {
      this.container.markTaskPending(
        +event.dataTransfer?.getData('text/plain')!
      );
    }
  }
}
