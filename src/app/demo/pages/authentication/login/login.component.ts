// angular import
import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Notyf } from 'notyf';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, MatFormFieldModule, FormsModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class LoginComponent {
  email = '';
  password = '';
  showColaboradorForm = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  colaboradorCaracteristicas: string[] = ['Paisagismo', 'Manutenção'];
  caracteristicaInput: string;
  selectedProfissao: string;
  
  profissoes: string[] = [
    'Pintor',
    'Jardinagem',
    'Eletricista',
    'Encanador',
    'Carpinteiro',
    'Limpeza',
    'Decorador',
    'Pedreiro',
    'Marceneiro',
    'Programador',
    'Contador',
    'Tradutor',
    'Professor',
    'Libras',
    'Músico',
    'Fotógrafo',
    'Designer',
    'Videomaker',
    'Ilustrador',
    'Cabeleireiro',
    'Maquiador',
    'Manicure',
    'Personal Trainer',
    'Massagista',
    'Chef',
    'Garçom',
    'DJ',
    'Organizador',
    'Decorador de Festas',
    'Construção',
    'Vigilância',
    'Portaria',
    'Mecânico',
    'Alfaiate',
    'Motorista',
    'Veterinário'
  ];
  
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addCaracteristica(event: any): void {
    const input = event.target;
    const value = input.value;

    if ((value || '').trim()) {
      this.colaboradorCaracteristicas.push(value.trim());
      console.log(this.colaboradorCaracteristicas);
      
    }

    input.value = '';
  }

  removeCaracteristica(caracteristica: string): void {
    const index = this.colaboradorCaracteristicas.indexOf(caracteristica);

    if (index >= 0) {
      this.colaboradorCaracteristicas.splice(index, 1);
    }
  }
}
