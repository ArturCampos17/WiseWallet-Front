// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao cadastrar usuário:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
}