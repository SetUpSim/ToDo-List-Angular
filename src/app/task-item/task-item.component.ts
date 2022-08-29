import { Component, Input } from '@angular/core';
import { Task } from '../task.model';
import { TasksContainerService } from '../tasks-container.service';
import { AppGlobalsService } from '../app-globals.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task: Task;
  isInLocalEditMode = false;
  isInEditMode = false;

  constructor(
    public container: TasksContainerService,
    private _appGlobals: AppGlobalsService
  ) {
    this.task = {
      id: 0,
      description: 'Default task',
      dueDate: undefined,
      doneDate: undefined,
      status: 0,
    };

    this._appGlobals.isInEditMode.subscribe(
      (value: boolean) => (this.isInEditMode = value)
    );
  }

  onEnableEditMode(event: Event) {
    event.stopPropagation();
    this.isInLocalEditMode = true;
    this._appGlobals.setIsInEditMode(true);
  }

  onConfirmEdit(event: Event) {
    event.stopPropagation();
    if (this.isInLocalEditMode) {
      this._appGlobals.setIsInEditMode(false);
      this.isInLocalEditMode = false;
    }
  }

  onRejectEdit(event: Event) {
    event.stopPropagation();
    if (this.isInLocalEditMode) {
      this._appGlobals.setIsInEditMode(false);
      this.isInLocalEditMode = false;
    }
  }

  onDeleteItem() {
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
