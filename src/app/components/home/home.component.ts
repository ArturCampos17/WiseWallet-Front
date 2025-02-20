import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  originalUserData: any;
  userProfile: any = {};
  loading = true;
  error = false; 
  errorMessage = '';
  
  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.userProfile = data || {};
        this.loading = false;
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        this.errorMessage = error.message; 
      }
    });
  }
}