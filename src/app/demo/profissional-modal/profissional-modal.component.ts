import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ProfissionalProximo {
  lat: number;
  lng: number;
  profissao: string;
  nome: string;
  distancia: number; // em km
  profileImage: string;
  rating: number;
  completedProjects: number;
  hourlyRate: number;
  level: string;
}

@Component({
  selector: 'app-profissional-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profissional-modal.component.html',
  styleUrls: ['./profissional-modal.component.scss']
})
export class ProfissionalModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProfissionalProximo,
    private dialogRef: MatDialogRef<ProfissionalModalComponent>
  ) { }

  onContact() {
    window.alert('Função de contato será implementada em breve!');
  }

  closeModal() {
    this.dialogRef.close();
  }
}
