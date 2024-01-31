import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiUrl = 'http://localhost:5000'
  todo : Todo [] = [];

  constructor(
    public router: Router,
    public http: HttpClient
  ) { }


  getAllTasks()  {
    return this.http.get(`${this.apiUrl}/get_all_tasks`);
  }

  getTaskTitleById(id: string): Observable<any>  {
    console.log(id)
    return this.http.get<any>(`${this.apiUrl}/get_one_task/${id}`)
  }

  toggleItem(id: string,updatedTask: Todo): Observable<any> {
    const url = `${this.apiUrl}/update_task/${id}`;
    return this.http.put<any>(url, updatedTask);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete_task/${id}`);
  }

  addTask(item: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      });
    return this.http.post<any>(`${this.apiUrl}/create_task`,  {"title": item}, { headers });
  }

  editTask(updatedTask: Todo, id: string): Observable<any> {
    const url = `${this.apiUrl}/update_task/${id}`;
    return this.http.put<any>(url, updatedTask);
  }
}
