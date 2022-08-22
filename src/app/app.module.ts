import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksContainerService } from './tasks-container.service';
import { TaskItemComponent } from './task-item/task-item.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TasksListComponent,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [TasksContainerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
