import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'https://localhost:7190/api/Task';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addTask(title: string, description?: string) {
    return this.http.post(`${this.baseUrl}`, { title, description });
  }

  updateTask(id: number, updatedTask: { title?: string; description?: string; isCompleted?: boolean }) {
    return this.http.put(`${this.baseUrl}/${id}`, updatedTask);
  }

  markAsDone(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/done`, {});
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
