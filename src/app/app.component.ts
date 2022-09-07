import { Component, ViewEncapsulation } from '@angular/core';
import { DateTimeService } from './datetime.service';
import { TasksContainerService } from './tasks-container.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TasksContainerService, DateTimeService],
})
export class AppComponent {
  title = 'todo-list-app';
  isInEditMode = false;

  onChangeEditMode(mode: boolean) {
    this.isInEditMode = mode;
  }
}
