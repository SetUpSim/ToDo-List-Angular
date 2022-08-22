import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksContainerService {

  private pendingTasksSource = new BehaviorSubject<Task[]>([]);
  private doneTasksSource = new BehaviorSubject<Task[]>([]);
  pendingTasks = this.pendingTasksSource.asObservable();
  doneTasks = this.doneTasksSource.asObservable();

  constructor() {}

  addPendingTask(id: number, description: string, due?: Date) {
    const toEmit = this.pendingTasksSource.getValue();
    toEmit.push(
      {
        id: id,
        description: description,
        dueDate: due,
        status: TaskStatus.Pending
      }
      );
    this.pendingTasksSource.next(toEmit);
  }

  markTaskDone(id: number) {
    
    const doneTask = this.pendingTasksSource.getValue().find(
      task => task.id === id
    );

    if (doneTask) {
      const toEmitPending = this.pendingTasksSource.getValue().filter(task => task !== doneTask);
      const toEmitDone = this.doneTasksSource.getValue();
      doneTask.status = TaskStatus.Done;
      toEmitDone.push(doneTask);
      this.pendingTasksSource.next(toEmitPending);
      this.doneTasksSource.next(toEmitDone);   
    }
  }

  // markTaskPending(id: number) {
  //   const task = this.tasks.find(task => task.id === id);
  //   if (task) {
  //     task.status = TaskStatus.Pending;    
  //   }
  // }

  // deleteTask(id: number) {
  //   const task = this.tasks.find(task => task.id === id);
  //   if (task) {
  //     const index = this.tasks.indexOf(task);
  //     delete this.tasks[index];
  //   }
  // }
}
