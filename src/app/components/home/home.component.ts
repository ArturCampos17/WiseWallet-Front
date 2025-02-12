import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (userData) => {
        this.userName = userData.name; // Armazena o nome do usuário
      },
      (error) => {
        console.error('Erro ao obter dados do usuário:', error);
        this.userName = null; // Define como nulo em caso de erro
      }
    );
  }
}