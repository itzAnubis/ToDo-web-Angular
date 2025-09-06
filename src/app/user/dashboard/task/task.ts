import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../shared/services/task-services';


export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}


export interface StatusChangeEvent {
  id: number;
  isCompleted: boolean;
}

@Component({
  selector: 'app-task-item',
  standalone: true, 
  imports: [],
  templateUrl: './task.html',
  styleUrls: ['./task.css']
})
export class TaskComponent {
  
  @Input() task!: Task; 
  
  constructor(private taskService: TaskService) { }


  @Output() deleteClick = new EventEmitter<number>();
  
  @Output() statusChange = new EventEmitter<StatusChangeEvent>();

onStatusChange(task: Task, isCompleted: boolean) {
  task.isCompleted = isCompleted;
  this.taskService.updateTask(task.id, { isCompleted: true }).subscribe({
  next: () => console.log('Task updated!'),
  error: err => console.error(err)
});

}

onDeleteClick(task: Task) {
  if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
    this.taskService.deleteTask(task.id).subscribe({
      next: () => console.log('Task deleted'),
      error: err => console.error(err)
    });
  }
}

}