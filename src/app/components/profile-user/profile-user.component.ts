
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  isEditing = false;
  originalUserData: any;

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.originalUserData = { ...this.user };
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
    // Aqui você fará a chamada para a API quando implementar o backend
    this.isEditing = false;
    this.originalUserData = null;
  }

  cancelEdit() {
    this.user = { ...this.originalUserData };
    this.isEditing = false;
  }

  // Variável que será populada pelo backend posteriormente
  user: any = {
    // Dados mockados - Remover quando implementar o backend
    fullName: 'Artur Campos Periera',
    email: 'arturp282@gmail.com',
    phone: '(48) 9 9699-5811',
    accountNumber: '123456-7',
    doc: '123.456.789-09',
    birthDate: "17/03/2001",
    registrationDate: new Date('2022-03-15'),
    twoFactorAuth: true,
    lastLogin: new Date(),
    accountType: 'Premium',

    residentialAddress: {
      street: 'Avenida Paulista',
      number: '1000',
      complement: 'Apto 123',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01311000'
    },

    billingAddress: {
      street: 'Rua Haddock Lobo',
      number: '595',
      complement: 'Sala 45',
      neighborhood: 'Cerqueira César',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01414001'
    },

    emergencyContact: {
      name: 'Carlos Eduardo Oliveira',
      phone: '11988776655',
      relationship: 'Cônjuge'
    },

  };

  constructor() {
    // Aqui você injetará o serviço de API posteriormente
    // Ex: private apiService: ApiService
  }

  ngOnInit(): void {
    // Chamada que será feita para o backend
    /* this.apiService.getUserProfile().subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Erro ao carregar perfil:', err)
    }); */
  }

  // Métodos que serão implementados com chamadas à API
  onUpdateData() {
    console.log('Implementar lógica de atualização');
    // Ex: Abrir modal/formulário de edição

  }

  onChangePassword() {
    console.log('Implementar fluxo de alteração de senha');
  }

}
