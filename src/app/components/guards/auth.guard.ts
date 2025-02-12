import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      take(1), // Pega apenas o primeiro valor emitido pelo Observable
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true; // Permite a navegação
        } else {
          this.router.navigate(['/login']); // Redireciona para a página de login
          return false; // Impede a navegação
        }
      })
    );
  }
}