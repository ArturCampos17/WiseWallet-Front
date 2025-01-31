import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router'; // Adicione esta importação
import { AuthService } from '../services/auth.service'; // Adicione esta importação

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  title = 'meu-projeto';
  isMenuActive = false;

  // Adicione o construtor com a injeção de dependência
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
  }

  closeMenu(): void {
    this.isMenuActive = false;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    this.closeMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      // Força um recarregamento completo da página (opcional)
      window.location.reload();
    } catch (error) {
      console.error('Erro no logout:', error);
    }

  }
}
