import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  message: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private toastrService: NbToastrService,
    private router: Router,
  ) { }

  onLogin() {

    if (!this.credentials.email || !this.credentials.password) {
      this.toastrService.danger('Por favor, preencha todos os campos.', 'Erro', {
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        duration: 3000,
      });
      return;
    }


    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        if (response.authenticated) {

          const token = response.token;
          this.authService.setAuthenticated(true, token);
        
          this.toastrService.success('Login realizado com sucesso!', 'Sucesso', {
            position: NbGlobalPhysicalPosition.TOP_RIGHT,
            duration: 3000,
          });
          
          setTimeout(()=>{
            this.router.navigate(['/home']);
          }, 500)
        } 
      },(error) => {
        this.toastrService.danger('Erro ao fazer login. Verifique suas credenciais.', 'Erro', {
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          duration: 3000,
        });
      }
    );
  }
}
