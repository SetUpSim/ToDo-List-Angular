import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TasksContainerService } from '../tasks-container.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent {

  todayDate = new Date().toISOString().split('T')[0];
  taskForm: FormGroup;
  showHint = false;

  constructor(private container: TasksContainerService) { 
    this.taskForm = new FormGroup({
      description: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      dueDate: new FormControl()
    })
  }

  get description() {
    return this.taskForm.get("description");
  }

  onAddToDo(formData: {description: string, dueDate: Date}) {
    if (this.taskForm.valid) {
      this.container.addPendingTask(
        Math.random(), formData.description, formData.dueDate
      );
      this.taskForm.reset();
    } else {
      this.showHint = true;
    }
  }
}
