import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component'
import { EditTaskComponent } from './todos/edit-task/edit-task.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'edit/:id', component: EditTaskComponent },
  { path: 'signin', component: AuthenticationComponent },
  { path: 'signup', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
