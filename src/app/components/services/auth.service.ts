import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/auth/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => new Error(error.message));
      })
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

setAuthenticated(authenticated: boolean, token?: string): void {
  this.isAuthenticatedSubject.next(authenticated);
  localStorage.setItem('isAuthenticated', authenticated.toString());
  if (token) {
    localStorage.setItem('jwtToken', token);
  }
}

  getIsAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUser(): Observable<{ name: string; email: string }> {
    return this.http.get<{ name: string; email: string }>('http://localhost:8080/api/auth/user', { withCredentials: true });
  }
}