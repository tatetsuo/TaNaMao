import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface PaymentConfirmationData {
  service: {
    title: string;
    profileImage: string;
    freelancerName: string;
    price: number;
  };
  formData: {
    paymentMethod: string;
    scheduleDate: Date;
    scheduleTime: string;
    serviceLocation: string;
  };
  total: number;
  serviceFee: number;
}

@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule
  ],
  template: `
    <h2 mat-dialog-title>Confirmar Pagamento</h2>
    <mat-dialog-content>
      <div class="confirmation-details">
        <div class="service-info">
          <img [src]="data.service.profileImage" [alt]="data.service.freelancerName" class="provider-image">
          <div class="service-title">
            <h3>{{data.service.title}}</h3>
            <p class="freelancer">por {{data.service.freelancerName}}</p>
          </div>
        </div>

        <mat-divider></mat-divider>

        <div class="payment-info">
          <div class="payment-row">
            <span class="label">Método de pagamento:</span>
            <span class="value">{{data.formData.paymentMethod}}</span>
          </div>
          <div class="payment-row">
            <span class="label">Data agendada:</span>
            <span class="value">{{data.formData.scheduleDate | date:'dd/MM/yyyy'}} às {{data.formData.scheduleTime}}</span>
          </div>
          <div class="payment-row">
            <span class="label">Local:</span>
            <span class="value">{{data.formData.serviceLocation}}</span>
          </div>
        </div>

        <mat-divider></mat-divider>

        <div class="cost-details">
          <div class="cost-row">
            <span>Valor do serviço</span>
            <span>R$ {{data.service.price.toFixed(2)}}</span>
          </div>
          <div class="cost-row">
            <span>Taxa de serviço</span>
            <span>R$ {{data.serviceFee.toFixed(2)}}</span>
          </div>
          <div class="cost-row total">
            <span>Total a pagar</span>
            <span>R$ {{data.total.toFixed(2)}}</span>
          </div>
        </div>

        <div class="warning-message" *ngIf="data.formData.paymentMethod === 'Saldo TaNaMao'">
          <mat-icon color="warn">info</mat-icon>
          <span>Este valor será debitado do seu saldo do TaNaMao.</span>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Confirmar Pagamento</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .confirmation-details {
      padding: 10px;
    }
    .service-info {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .provider-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 15px;
    }
    .service-title h3 {
      margin: 0;
      font-size: 18px;
    }
    .freelancer {
      margin: 5px 0 0;
      color: #666;
    }
    mat-divider {
      margin: 15px 0;
    }
    .payment-info, .cost-details {
      margin: 15px 0;
    }
    .payment-row, .cost-row {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
    }
    .label {
      font-weight: 500;
    }
    .total {
      font-weight: bold;
      font-size: 1.1em;
      margin-top: 10px;
    }
    .warning-message {
      display: flex;
      align-items: center;
      background-color: #fff8e1;
      padding: 10px;
      border-radius: 4px;
      margin: 15px 0;
    }
    .warning-message mat-icon {
      margin-right: 10px;
      color: #ff9800;
    }
  `]
})
export class PaymentConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentConfirmationData
  ) {}
}
