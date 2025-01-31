import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  private readonly AUTH_STORAGE_KEY = 'auth_token';
  private readonly mockUser: Credentials = {
    username: 'admin',
    password: '1234'
  };

  constructor(private router: Router) {
    this.initializeAuthState();
  }

  login(credentials: Credentials): boolean {
    const isValid = this.validateCredentials(credentials);

    if (isValid) {
      this.setAuthentication(true);
      this.router.navigate(['/home']);
    } else {
      this.isAuthenticatedSubject.next(false);
    }

    return isValid;
  }

  logout(): void {
    this.clearAuthentication();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login'], { replaceUrl: true });
    window.history.replaceState(null, '', '/login');
  }

  private validateCredentials(credentials: Credentials): boolean {
    return credentials.username === this.mockUser.username &&
           credentials.password === this.mockUser.password;
  }

  private initializeAuthState(): void {
    const token = localStorage.getItem(this.AUTH_STORAGE_KEY);
    this.isAuthenticatedSubject.next(!!token);
  }

  private setAuthentication(isAuthenticated: boolean): void {
    if (isAuthenticated) {
      localStorage.setItem(this.AUTH_STORAGE_KEY, 'mock_jwt_token');
    } else {
      localStorage.removeItem(this.AUTH_STORAGE_KEY);
    }
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  private clearAuthentication(): void {
    localStorage.removeItem(this.AUTH_STORAGE_KEY);
    sessionStorage.clear();
    this.isAuthenticatedSubject.next(false);
  }

  get currentAuthState(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
