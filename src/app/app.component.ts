import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'todo-list-app';
  isInEditMode = false;

  onChangeEditMode(mode: boolean) {
    this.isInEditMode = mode;
  }
}
