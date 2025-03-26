import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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

  getCategory(): Observable<Category[]> {
        const token = localStorage.getItem('jwtToken');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, 
        });
    
    return this.http.get<Category[]>(this.apiUrl, { headers });
  }
}