import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTimeService } from '../datetime.service';
import { Task, TaskStatus } from '../task.model';
import { TasksContainerService } from '../tasks-container.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() toggleEditModeEvent = new EventEmitter<boolean>(false);
  @Output() clickEvent = new EventEmitter<Event>();
  editTaskForm: FormGroup;
  isInEditMode = false;

  constructor(
    public container: TasksContainerService,
    public dateTime: DateTimeService
  ) {
    this.task = {
      id: 0,
      description: 'Default task',
      dueDate: undefined,
      doneDate: undefined,
      status: 0,
    };
    this.editTaskForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      date: new FormControl(),
    });

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
    if (this.editTaskForm.valid) {
      const formValue = this.editTaskForm.value;
      this.task.description = formValue.description;
      if (this.task.status == TaskStatus.Pending) {
        this.task.dueDate = formValue.date
          ? new Date(formValue.date)
          : undefined;
      } else {
        this.task.doneDate = formValue.date
          ? new Date(formValue.date)
          : undefined;
      }
      this.toggleEditModeEvent.emit(false);
    } else {
      alert('Invalid task properties!');
    }
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
