// app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './components/services/auth.service';
import { Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && !this.authService.isAuthenticated$) {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }
}
