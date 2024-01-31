import { Component, ElementRef, OnInit } from '@angular/core';
import { TodoService } from './todos.service'
import { Todo } from '../types/todo';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todo: Todo[]=[];
  currentItem!: Todo ;
  showChildComponent=false;
  isTaskLoaded: boolean = false;

  constructor(
    public todoService: TodoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this.todoService.getAllTasks().subscribe(
      (data) => {
       this.todo= (data as any).posts;
      },
      (error) => {
        console.log('An error occurred while fetching data.');
      }
    );
  }

  addTask(newItem: HTMLInputElement) {
    const title = newItem.value.trim();
    this.todoService.addTask(title).subscribe(
      (data) => {
        this.todo.push({
          _id: data._id,
          title: title,
          status:false
        });
      },
      (error) => {
        console.log('An error occurred while fetching data.');
      }
    );;
    newItem.value='';
  }

  deleteTask(id: string) {
    console.log(this.todo[0]._id)
    this.todo.splice(this.todo.findIndex(todo => todo._id === id), 1)
    this.todoService.deleteTask(id).subscribe(
      (data) => {
          console.log("deleted Successfully");
      },
      (error) => {
        console.log('An error occurred while fetching data.');
      }
    );;
  }

  toggleItem(id: string){
    const index = this.todo.findIndex(todo => todo._id === id);
    this.todo[index].status = !this.todo[index].status;
    this.todoService.toggleItem(id,this.todo[index]).subscribe(
      (data) => {
        console.log("toggled successfully");
      },
      (error) => {
        console.log("toggled unsuccessfully");
      }
    );
  }

  editTask = (id: string) => {
    this.router.navigate([`/edit/${id}`])
  }

}
