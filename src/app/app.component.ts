import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/services/auth.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Inscreve-se no Observable para atualizar o estado de autenticação
    this.authService.isAuthenticated.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
    });

    // Verifica o estado de autenticação ao iniciar a aplicação
    this.authService.checkAuthStatus();
  }
}