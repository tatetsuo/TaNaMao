import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AgendamentoServico } from 'src/app/core/interfaces/colaborador';

@Component({
  selector: 'app-job-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './job-details-modal.component.html',
  styleUrls: ['./job-details-modal.component.scss']
})
export class JobDetailsModalComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AgendamentoServico,
    private dialogRef: MatDialogRef<JobDetailsModalComponent>
  ) { }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pendente': return 'status-pending';
      case 'confirmado': return 'status-confirmed';
      case 'concluido': return 'status-completed';
      case 'cancelado': return 'status-cancelled';
      default: return '';
    }
  }
  
  getStatusText(status: string): string {
    switch (status) {
      case 'pendente': return 'Aguardando';
      case 'confirmado': return 'Confirmado';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  }

  confirmJob(): void {
    this.dialogRef.close({ action: 'confirm', jobId: this.data.id });
  }

  completeJob(): void {
    this.dialogRef.close({ action: 'complete', jobId: this.data.id });
  }

  cancelJob(): void {
    this.dialogRef.close({ action: 'cancel', jobId: this.data.id });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  
  // Método para tratamento de erro de imagem
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/avatar-2.jpg';
    imgElement.onerror = null; // Previne loop infinito
  }
}
