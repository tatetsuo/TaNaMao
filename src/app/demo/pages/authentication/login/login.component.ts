// angular import
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) { }

  login() {
    if (this.email === 'teste@teste.com' && this.password === '12') {
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('username', 'Gabriel Maia');
      this.router.navigate(['/default']);
    } else {
      const notyf = new Notyf();
      if (!this.email || !this.password) {
        notyf.error({
          message: 'Por favor escreva seu email e senha',
          position: { x: 'right', y: 'top' }
        });
      } else {
        notyf.error({
          message: 'Senha ou email errados',
          position: { x: 'right', y: 'top' }
        });
      }
    }
  }
}
