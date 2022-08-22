import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksContainerService {
  private pendingTasksSource = new BehaviorSubject<Task[]>([]);
  private doneTasksSource = new BehaviorSubject<Task[]>([]);
  pendingTasks = this.pendingTasksSource.asObservable();
  doneTasks = this.doneTasksSource.asObservable();

  constructor() {}

  addPendingTask(id: number, description: string, due?: Date) {
    const toEmit = this.pendingTasksSource.getValue();
    toEmit.push({
      id: id,
      description: description,
      dueDate: due,
      doneDate: undefined,
      status: TaskStatus.Pending,
    });
    this.pendingTasksSource.next(toEmit);
  }

  markTaskDone(id: number) {
    const doneTask = this.pendingTasksSource
      .getValue()
      .find((task) => task.id === id);

    if (doneTask) {
      const toEmitPending = this.pendingTasksSource
        .getValue()
        .filter((task) => task !== doneTask);
      const toEmitDone = this.doneTasksSource.getValue();
      doneTask.status = TaskStatus.Done;
      doneTask.doneDate = new Date();
      toEmitDone.push(doneTask);
      this.pendingTasksSource.next(toEmitPending);
      this.doneTasksSource.next(toEmitDone);
    }
  }

  markTaskPending(id: number) {
    const pendingTask = this.doneTasksSource
      .getValue()
      .find((task) => task.id === id);

    if (pendingTask) {
      const toEmitDone = this.doneTasksSource
        .getValue()
        .filter((task) => task !== pendingTask);
      const toEmitPending = this.pendingTasksSource.getValue();
      pendingTask.status = TaskStatus.Pending;
      toEmitPending.push(pendingTask);
      this.pendingTasksSource.next(toEmitPending);
      this.doneTasksSource.next(toEmitDone);
    }
  }

  deleteTask(id: number) {
    const pending = this.pendingTasksSource
      .getValue()
      .find((task) => task.id === id);
    if (pending) {
      const toEmitPending = this.pendingTasksSource
        .getValue()
        .filter((task) => task.id != id);
      this.pendingTasksSource.next(toEmitPending);
    }

    const done = this.doneTasksSource.getValue().find((task) => task.id === id);
    if (done) {
      const toEmitDone = this.doneTasksSource
        .getValue()
        .filter((task) => task.id != id);
      this.pendingTasksSource.next(toEmitDone);
    }
  }
}
