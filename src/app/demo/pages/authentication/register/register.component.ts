import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatChipsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent {
  showColaboradorForm = false;
  colaboradorCaracteristicas: string[] = ['Paisagismo', 'Manutenção'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addCaracteristica(event: any): void {
    const input = event.target;
    const value = input.value;

    if ((value || '').trim()) {
      this.colaboradorCaracteristicas.push(value.trim());
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
