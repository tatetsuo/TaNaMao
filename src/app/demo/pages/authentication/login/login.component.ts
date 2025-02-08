// angular import
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
      alert('Invalid credentials');
    }
  }
}
