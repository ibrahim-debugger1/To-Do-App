import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  msg: string = '';
  email: string = ''
  password: string = ''
  constructor(
    public router: Router,
    public authService: AuthService
  ){}

  moveToSignUp = () => {
    this.router.navigate([`/signup`])
  }

  submit(){

    const userInfo = {
      email: this.email,
      password: this.password
    }

    this.authService.logInUser(userInfo).subscribe(
      (data) => {
        localStorage.setItem('token', data?.Token);
        this.msg = data?.msg
        this.router.navigate([`/`])
      },
      (error) => {
        this.msg = error?.error.msg;
        console.log('An error occurred while fetching data.');
      }
    );
  }
}
