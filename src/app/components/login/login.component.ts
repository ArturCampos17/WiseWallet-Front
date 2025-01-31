import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  credentials = { username: '', password: '' };
  loginError = false;

  constructor(private authService: AuthService) {}

  onLogin() {
    this.loginError = false;
    this.authService.login(this.credentials);
  }
}
