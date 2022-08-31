import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task.model';
import { TasksContainerService } from '../tasks-container.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() toggleEditModeEvent = new EventEmitter<boolean>(false);
  @Output() clickEvent = new EventEmitter<Event>();
  isInEditMode = false;

  constructor(public container: TasksContainerService) {
    this.task = {
      id: 0,
      description: 'Default task',
      dueDate: undefined,
      doneDate: undefined,
      status: 0,
    };

    this.toggleEditModeEvent.subscribe((value) => (this.isInEditMode = value));
  }

  onClick() {
    if (!this.isInEditMode) {
      this.clickEvent.emit();
    }
  }

  onDeleteItem(event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      this.toggleEditModeEvent.emit(false);
      this.container.deleteTask(this.task.id);
    }
  }

  onActivateEditMode(event: Event) {
    event.stopPropagation();
    this.toggleEditModeEvent.emit(true);
  }

  onConfirmEdit(event: Event) {
    event.stopPropagation();
    this.toggleEditModeEvent.emit(false);
  }

  onRejectEdit(event: Event) {
    event.stopPropagation();
    if (confirm('Do you want to reject your changes?')) {
      this.toggleEditModeEvent.emit(false);
    }
  }

  dragStartHandler(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData(
        'text/plain',
        (event.target as HTMLElement).id
      );
      event.dataTransfer.dropEffect = 'move';
    }
  }
}
