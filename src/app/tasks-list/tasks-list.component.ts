import { Component, OnInit } from '@angular/core';
import { TasksContainerService } from '../tasks-container.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  // providers: [ TasksContainerService ]
})
export class TasksListComponent implements OnInit {

  pendingTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(public container: TasksContainerService) {
  }

  ngOnInit(): void {
    this.container.pendingTasks.subscribe((tasks) => {
      console.log("Event received");
      this.pendingTasks = tasks;
    });
  }

  dragEnterHandler(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.add("draggedover");
  }

  dragLeaveHandler(event: DragEvent) {
    event.preventDefault();
    (event.target as HTMLElement).classList.remove("draggedover");
  }

  dropHandler(event: DragEvent) {
    event.preventDefault();
    const target = event.target as HTMLElement;
    target.classList.remove("draggedover");
    if (target.id == 'done-tasks') {
      this.container.markTaskDone(+event.dataTransfer?.getData("text/plain")!)
    } else {
      this.container.markTaskPending(+event.dataTransfer?.getData("text/plain")!)
    }
  }

}
