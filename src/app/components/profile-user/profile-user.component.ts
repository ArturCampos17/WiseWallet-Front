
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
  userProfile: any = {};
  loading = true;
  error = false; 
  errorMessage = '';
  formattedBirthDate: string = '';

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.originalUserData = { ...this.userProfile };
    }
  }

  validateCEP(event: KeyboardEvent) {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    const isDigit = /[0-9]/.test(event.key);

    if (!isDigit && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }

    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    input.value = value;
  }

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
    this.userService.getUserProfile().subscribe({
      
      next: (data) => {
        this.userProfile = data || {};
        this.loading = false;
        if (this.userProfile.birthDate) {
          this.formattedBirthDate = this.formatDate(this.userProfile.birthDate);
        }
      },
      error: (error) => {
        this.error = true;
        this.loading = false;
        this.errorMessage = error.message; 
      }
    });
    
  }

  saveChanges() {
    if (!this.userProfile || !this.userProfile.name || !this.userProfile.email) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    console.log('Enviando dados ao backend:', JSON.stringify(this.userProfile, null, 2));
    this.userService.updateUserProfile(this.userProfile).subscribe({
      next: (updatedData) => {
        console.log('Perfil atualizado com sucesso:', updatedData);
        this.isEditing = false;
        this.originalUserData = null;
        alert('Alterações salvas com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao atualizar perfil:', error);
        if (error.status === 401) {
          alert('Sessão expirada. Faça login novamente.');
        } else if (error.status === 403) {
          alert('Você não tem permissão para realizar esta operação.');
        } else {
          alert('Ocorreu um erro ao salvar as alterações. Por favor, tente novamente.');
        }
      },
    });
  }
  
  cancelEdit() {
    this.userProfile = { ...this.originalUserData };
    this.isEditing = false;
  }

  
  private formatDate(dateString: string): string {
    const date = new Date(dateString + 'T00:00:00'); 
    const day = String(date.getUTCDate()).padStart(2, '0'); 
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

}
