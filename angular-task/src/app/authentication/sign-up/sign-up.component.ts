import { Component } from '@angular/core';
import { User } from 'src/app/types/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  msg: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  phone: string = '';
  newUser!: User;

  constructor(
    public authService: AuthService,
    public router: Router
  ){

  }
  submit() {
    this.newUser = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      phone:this.phone
    }

    this.authService.addUser(this.newUser).subscribe(
      (data) => {
        localStorage.setItem('token', data?.Token);
        this.msg = data?.msg
        this.router.navigate([`/`])
      },
      (error) => {
        this.msg = error?.error.msg;
        console.log(error)
        console.log('An error occurred while fetching data.');
      }
    );
}
}
