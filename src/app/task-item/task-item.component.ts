import { Component, Input } from '@angular/core';
import { Task } from '../task.model';
import { TasksContainerService } from '../tasks-container.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task;
  editMode = true;

  constructor(public container: TasksContainerService) {
    this.task = {
      id: 0,
      description: 'Default task',
      dueDate: undefined,
      doneDate: undefined,
      status: 0,
    };
  }

  onDeleteItem(event: Event) {
    this.container.deleteTask(this.task.id);
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
