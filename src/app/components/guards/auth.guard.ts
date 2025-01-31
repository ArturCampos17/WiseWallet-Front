import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isAuthenticated$.pipe(
      take(1), // Garante que a inscrição seja encerrada após a primeira emissão
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/login'], { replaceUrl: true });
          return false;
        }
        return true;
      })
    );
  }
}
