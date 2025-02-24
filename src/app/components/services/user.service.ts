import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    user.cpfCnpj = this.cleanCpf(user.cpfCnpj);
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
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
    console.log('Credenciais enviadas para o login:', credentials);
    return this.http.post(`http://localhost:8080/api/auth/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao fazer login:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }


  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/profile`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao carregar usuário:', error);
        if (error.status === 403) {
          return throwError(() => new Error('Acesso negado. Faça login novamente.'));
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  updateUserProfile(userProfile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, userProfile);
  }
  // updateUserProfile(updatedData: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/profile`, updatedData).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Erro ao editar usuário:', error);

  //       let errorMsg = 'Erro desconhecido';
  //       if (error.error instanceof ErrorEvent) {
  //         errorMsg = `Erro do cliente: ${error.error.message}`;
  //       } else {
  //         errorMsg = `Erro do servidor (Código: ${error.status}): ${error.message}`;
  //       }

  //       return throwError(() => new Error(errorMsg));
  //     })
  //   );
  // }
}