import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  code: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      throw new Error('JWT Token não encontrado no localStorage.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  
  createCategory(category: Partial<Category>): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, category, { headers });
  }

 
  getCategory(): Observable<Category[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Category[]>(this.apiUrl, { headers });
  }

  
  updateCategory(id: number, category: Partial<Category>): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, category, { headers });
  }

  
  activateCategory(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/${id}/activate`, {}, { headers });
  }

  deactivateCategory(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiUrl}/${id}/deactivate`, {}, { headers });
  }
}