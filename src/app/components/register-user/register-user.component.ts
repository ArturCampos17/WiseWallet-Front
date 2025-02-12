import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'; 
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  registrationForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      cpfCnpj: ['', [Validators.required, Validators.minLength(11)]],
      profession: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      address: ['', Validators.required],
      complement: [''],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      cep: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;

   
      this.userService.registerUser(userData).subscribe({
        next: (response) => {
          this.message = 'Cadastro realizado com sucesso!';
          this.errorMessage = '';
          console.log('Resposta do backend:', response);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Erro ao cadastrar usuário.';
          this.message = '';
          console.error('Erro ao cadastrar usuário:', err);
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.message = '';
    }
  }
}