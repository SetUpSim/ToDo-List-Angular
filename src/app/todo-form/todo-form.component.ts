import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksContainerService } from '../tasks-container.service';
import { DateTimeService } from '../datetime.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  taskForm: FormGroup;
  showHint = false;

  constructor(
    private container: TasksContainerService,
    public dateTime: DateTimeService
  ) {
    this.taskForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      dueDate: new FormControl(),
    });
  }

  get description() {
    return this.taskForm.get('description');
  }

  onAddToDo(formData: { description: string; dueDate: Date }) {
    if (this.taskForm.valid) {
      this.container.addPendingTask(
        Math.random(),
        formData.description,
        formData.dueDate ? new Date(formData.dueDate) : undefined
      );
      this.taskForm.reset();
    } else {
      this.showHint = true;
    }
  }
}
