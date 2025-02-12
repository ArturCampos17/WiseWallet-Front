import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ message: string; authenticated: boolean }>(
      'http://localhost:8080/api/auth/login',
      credentials,
      { withCredentials: true }
    ).subscribe(
      (response) => {
        if (response.authenticated) {
          this.setAuthenticated(true);
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais.');
      }
    );
  }


  logout() {
    this.http.post('/api/logout', {}, { withCredentials: true }).subscribe(() => {
      this.setAuthenticated(false);
      this.router.navigate(['/login']);
    });
  }

checkAuthStatus() {
  this.http.get<{ authenticated: boolean }>('http://localhost:8080/api/auth/check-auth', { withCredentials: true }).subscribe(
    (response) => {
      this.setAuthenticated(response.authenticated);
    },
    (error) => {
      console.error('Erro ao verificar estado de autenticação:', error);
      this.setAuthenticated(false);
    }
  );
}
  setAuthenticated(status: boolean) {
    this.isAuthenticatedSubject.next(status);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUser(): Observable<{ name: string; email: string }> {
    return this.http.get<{ name: string; email: string }>('http://localhost:8080/api/auth/user', { withCredentials: true });
  }
}