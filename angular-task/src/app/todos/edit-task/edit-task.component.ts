import { Component, Input, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';


import { TodoService } from '../todos.service'
import { Todo } from 'src/app/types/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  @Input() todo: Todo = {};
  itemId: string = '';
  itemTitle: string = "";
  title: string = '';

  constructor(
    public todoService: TodoService,
    public route: ActivatedRoute,
    public router: Router
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.itemId = params['id'];
    });
    this.todoService.getTaskTitleById(this.itemId).subscribe(
      (data) => {
        this.todo=data['posts'];
        this.itemTitle = data['posts']['title'];
      },
      (error) => {
        console.log('An error occurred while fetching data.');
      }
    );
  }

  editTask(itemTitle: string, itemId: string) {
    this.todo.title = itemTitle;
    this.todoService.editTask(this.todo, itemId).subscribe(
      (data) => {
        console.log('updated successfully');
        this.router.navigate([`/`])
      },
      (error) => {
        console.log('An error occurred while fetching data.');
      }
    );
  }
}
