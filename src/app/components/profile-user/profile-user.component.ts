
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  isEditing = false;
  originalUserData: any;
  userProfile: any = null;
  loading = true;
  error = false; 
  errorMessage = '';

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.originalUserData = { ...this.userService };
    }
  }

  validateCEP(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    const isDigit = /[0-9]/.test(event.key);

    if (!isDigit && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }

    // Formatação automática
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    input.value = value;
  }

  saveChanges() {
    this.userService.updateUserProfile(this.userProfile).subscribe(
      (updatedData) => {
        console.log('Perfil atualizado com sucesso:', updatedData);
        this.isEditing = false;
        this.originalUserData = null;
      },
      (error) => {
        console.error('Erro ao atualizar perfil:', error);
        alert('Ocorreu um erro ao salvar as alterações.');
      }
    );
  }
  
  cancelEdit() {
    this.userService = { ...this.originalUserData };
    this.isEditing = false;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
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
