import { Component, OnInit } from '@angular/core';
import { TasksContainerService } from '../tasks-container.service';
import { AppGlobalsService } from '../app-globals.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TasksListComponent implements OnInit {
  isInEditMode = false;

  constructor(
    public container: TasksContainerService,
    private _appGlobals: AppGlobalsService
  ) {
    this._appGlobals.isInEditMode.subscribe(
      (value: boolean) => (this.isInEditMode = value)
    );
  }

  ngOnInit(): void {}

  dragEnterHandler(event: DragEvent) {
    if (!this.isInEditMode) {
      event.preventDefault();
      (event.target as HTMLElement).classList.add('draggedover');
    }
  }

  dragLeaveHandler(event: DragEvent) {
    if (!this.isInEditMode) {
      event.preventDefault();
      (event.target as HTMLElement).classList.remove('draggedover');
    }
  }

  dropHandler(event: DragEvent) {
    if (this.isInEditMode) {
      let target = event.target as HTMLElement;
      target.classList.remove('draggedover');
      while (target && target.parentElement && target.nodeName !== 'UL') {
        //???
        target = target.parentElement;
      }
      if (target.id === 'done-tasks') {
        this.container.markTaskDone(
          +event.dataTransfer?.getData('text/plain')!
        );
      } else if (target.id === 'pending-tasks') {
        this.container.markTaskPending(
          +event.dataTransfer?.getData('text/plain')!
        );
      }
    }
  }
}
