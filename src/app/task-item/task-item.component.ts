import { Component, Input } from '@angular/core';
import { Task } from '../task.model'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent {

  @Input() task: Task;
  
  constructor() {
    this.task = {id:0, description: "Default task", dueDate: undefined, doneDate: undefined, status: 0};
  }

  dragStartHandler(event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", (event.target as HTMLElement).id);
      event.dataTransfer.dropEffect = "move";
    }
  }
}
