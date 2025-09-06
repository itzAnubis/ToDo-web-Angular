import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Task, TaskComponent, StatusChangeEvent } from './task/task';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TaskComponent,
    FormsModule,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  tasks: Task[] = [
    { id: 1, title: 'Finish Angular Report', description: 'Write the final section and conclusion.', isCompleted: false },
    { id: 2, title: 'Buy Groceries', description: 'Milk, bread, and eggs.', isCompleted: true },
    { id: 3, title: 'Call the Client', description: 'Discuss the project timeline.', isCompleted: false },
    { id: 4, title: 'Fix Bug #404', description: 'The login button is not working on mobile.', isCompleted: false }
  ];

  newTaskTitle: string = "";
  newTaskDescription: string = "";

  addTask() {
    if (!this.newTaskTitle.trim()) {
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      isCompleted: false
    };
    this.tasks.unshift(newTask);
    this.newTaskDescription = "";
    this.newTaskTitle = "";
  }

  deleteTask(idToDelete: number) {

    console.log(`Dashboard received request to delete ${idToDelete}`);
    this.tasks = this.tasks.filter(task => task.id !== idToDelete);
  }



  updateTaskStatus(event: StatusChangeEvent) {
    const taskToUpdate = this.tasks.find(task => task.id === event.id);
    if (taskToUpdate) {
      taskToUpdate.isCompleted = event.isCompleted;
      console.log(`Updated status for task ${event.id} to ${event.isCompleted}`);
    }
  }
}