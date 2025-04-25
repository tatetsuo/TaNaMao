import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { Notyf } from 'notyf';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { WalletService } from 'src/app/core/services/wallet.service';
import { ServiceStatusService } from 'src/app/core/services/service-status.service';
import { PaymentConfirmationComponent } from '../payment/payment-confirmation/payment-confirmation.component';
import { Servico } from 'src/app/core/interfaces/padroes';

@Component({
  selector: 'app-comprar-servico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    CardComponent,
    MatDialogModule
  ],
  templateUrl: './comprar-servico.component.html',
  styleUrls: ['./comprar-servico.component.scss']
})
export class ComprarServicosComponent implements OnInit {
  serviceData: Servico;
  contractForm: FormGroup;
  paymentMethods = [
    'Saldo TaNaMao',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
    'Boleto'
  ];
  currentBalance = 0;
  insufficientFunds = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private walletService: WalletService,
    private serviceStatusService: ServiceStatusService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.serviceData = navigation?.extras.state?.['serviceData'];

    if (!this.serviceData) {
      this.router.navigate(['/']);
      return;
    }

    this.contractForm = this.fb.group({
      serviceLocation: ['', Validators.required],
      scheduleDate: ['', Validators.required],
      scheduleTime: ['', Validators.required],
      additionalRequirements: [''],
      paymentMethod: ['Saldo TaNaMao', Validators.required],
      agreementTerms: [false, Validators.requiredTrue]
    });
    
    // Obtém o saldo atual
    this.currentBalance = this.walletService.getCurrentBalance();
    
    // Verifica se o usuário tem saldo suficiente
    this.checkBalance();
    
    // Observa mudanças no método de pagamento
    this.contractForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.insufficientFunds = method === 'Saldo TaNaMao' && this.calculateTotal() > this.currentBalance;
    });
  }

  ngOnInit(): void {
    if (!this.serviceData) {
      const notify = new Notyf();
      notify.error({
        message: 'Dados do serviço não encontrados',
        position: { x: 'right', y: 'top' }
      });
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.contractForm.valid) {
      const formData = this.contractForm.value;
      
      // Verificar o método de pagamento
      if (formData.paymentMethod === 'Saldo TaNaMao' && this.calculateTotal() > this.currentBalance) {
        const notify = new Notyf();
        notify.error({
          message: 'Saldo insuficiente para completar esta transação',
          position: { x: 'right', y: 'top' }
        });
        return;
      }
      
      // Abrir diálogo de confirmação de pagamento
      const dialogRef = this.dialog.open(PaymentConfirmationComponent, {
        width: '500px',
        data: {
          service: this.serviceData,
          formData: formData,
          total: this.calculateTotal(),
          serviceFee: this.serviceData.preco * 0.1
        }
      });

      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.processPayment(formData);
        }
      });
    }
  }

  private processPayment(formData: {
    paymentMethod: string;
    scheduleDate: string;
    scheduleTime: string;
    serviceLocation: string;
    additionalRequirements?: string;
  }) {
    const totalAmount = this.calculateTotal();
    
    // Processar o pagamento de acordo com o método escolhido
    if (formData.paymentMethod === 'Saldo TaNaMao') {
      // Adaptando para o formato esperado pelo walletService.payForService
      const paymentSuccess = this.walletService.payForService(
        totalAmount,
        {
          id: this.serviceData.id.toString(),
          title: this.serviceData.titulo,
          freelancerName: this.serviceData.nomeColaborador
        }
      );
      
      if (!paymentSuccess) {
        const notify = new Notyf();
        notify.error({
          message: 'Erro ao processar o pagamento',
          position: { x: 'right', y: 'top' }
        });
        return;
      }
    }
    
    // Registra o contrato de serviço
    /* const contract = this.serviceStatusService.addContract({
      serviceId: this.serviceData.id,
      title: this.serviceData.title,
      freelancerId: this.serviceData.id, // Normalmente viria de um backend
      freelancerName: this.serviceData.freelancerName,
      freelancerImage: this.serviceData.profileImage,
      price: this.serviceData.price,
      scheduledDate: serviceDate,
      scheduledTime: formData.scheduleTime,
      location: formData.serviceLocation,
      additionalRequirements: formData.additionalRequirements,
      paymentMethod: formData.paymentMethod,
      totalPaid: totalAmount,
      status: 'agendado'
    }); */

    const notify = new Notyf();
    notify.success({
      message: 'Contrato enviado com sucesso!',
      position: { x: 'right', y: 'top' }
    });
    this.router.navigate(['/default']);
  }

  calculateTotal(): number {
    return this.serviceData.preco + (this.serviceData.preco * 0.1);
  }
  
  private checkBalance(): void {
    this.insufficientFunds = this.calculateTotal() > this.currentBalance;
    
    if (this.insufficientFunds) {
      // Se não houver saldo suficiente, selecione outro método de pagamento por padrão
      this.contractForm.get('paymentMethod')?.setValue('Cartão de Crédito');
    }
  }
  
  get paymentMethodControl() {
    return this.contractForm.get('paymentMethod');
  }
  
  get isBalancePayment() {
    return this.paymentMethodControl?.value === 'Saldo TaNaMao';
  }
}