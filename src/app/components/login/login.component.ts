import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  onLogin() {
    console.log('Credenciais enviadas:', this.credentials);
    if (!this.credentials.email || !this.credentials.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.authService.login(this.credentials);
  }
}