import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'; 
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  registrationForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastrService: NbToastrService,
    private router: Router
  ) {
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

          this.toastrService.success('Usuário cadastrado com sucesso!', 'Sucesso', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            duration: 3000
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Erro ao cadastrar usuário.';
          this.message = '';
          console.error('Erro ao cadastrar usuário:', err);

       
          this.toastrService.danger('Erro ao cadastrar usuário.', 'Erro', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            duration: 3000
          });
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      this.message = '';

    
      this.toastrService.warning('Por favor, preencha todos os campos obrigatórios.', 'Atenção', {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        duration: 3000
      });
    }
  }
}