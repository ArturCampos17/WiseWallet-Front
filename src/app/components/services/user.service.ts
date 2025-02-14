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
    user.cpfCnpj = this.cleanCpf(user.cpfCnpj);
    return this.http.post(`${this.apiUrl}`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao cadastrar usuário:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
  private cleanCpf(cpf: string): string {
    if (!cpf) {
      return ''; 
    }
    return cpf.replace(/\D/g, ''); 
  }
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
  
  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao carregar usuário:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }
  updateUserProfile(updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile` , updatedData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao editar usuario:', error);
        return throwError(() => new Error(error.message));
      })
    ); 
  }
}