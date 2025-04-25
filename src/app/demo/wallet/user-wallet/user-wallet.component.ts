/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { WalletService } from 'src/app/core/services/wallet.service';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { Notyf } from 'notyf';
import { ConfiguracoesCarteira, Cartao, Transacao } from 'src/app/core/interfaces/usuario';



@Component({
  selector: 'app-user-wallet',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  
  balance = 0;
  transactions: Transacao[] = [];
  cards: Cartao[] = [];
  depositForm: FormGroup;
  withdrawForm: FormGroup;
  cardForm: FormGroup;
  currentUser: User | null = null;
  selectedCardForDeposit = '';
  cardBrands = ['Visa', 'Mastercard', 'American Express', 'Elo', 'Hipercard'];

  walletSettings: ConfiguracoesCarteira = {
    alertaSaldoBaixo: true,
    confirmacaoTransacao: true,
    alertaAtividadeSuspeita: false,
    requererPinParaSaques: true,
    limiteSaque: 1000,
    limiteTransferencia: 5000,
    pinSeguranca: ''
  };

  constructor(
    private walletService: WalletService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(10)]],
      description: [''],
      cardId: ['']
    });

    this.withdrawForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(10)]],
      description: ['']
    });

    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      holderName: ['', [Validators.required]],
      expiryDate: ['', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])/[0-9]{2}')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      type: ['credit', [Validators.required]],
      brand: ['', [Validators.required]]
    });

    // Carregar configurações salvas
    const savedSettings = localStorage.getItem('walletSettings');
    if (savedSettings) {
      this.walletSettings = JSON.parse(savedSettings);
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.balance = this.walletService.getCurrentBalance();
    
    // Mapeamento das transações do serviço para o formato da interface Transacao
    this.transactions = this.walletService.getTransactions().map(transaction => {
      return {
        id: transaction.id,
        data: transaction.data,
        valor: transaction.valor,
        descricao: transaction.descricao,
        tipo: this.mapTransactionType(transaction.tipo),
        servicoId: transaction.servicoId,
        nomeServico: transaction.nomeServico,
        colaboradorId: transaction.colaboradorId,
        nomeColaborador: transaction.nomeColaborador,
        status: this.mapTransactionStatus(transaction.status)
      };
    });
    
    // Mapeamento dos cartões do serviço para o formato da interface Cartao
    this.cards = this.walletService.getCards().map(card => {
      return {
        id: card.id,
        numero: card.numero,
        titular: card.titular,
        dataValidade: card.dataValidade,
        cvv: card.cvv,
        tipo: this.mapCardType(card.tipo),
        bandeira: card.bandeira,
        padrao: card.padrao,
        ultimosQuatroDigitos: card.ultimosQuatroDigitos,
        favorito: card.favorito || false
      };
    });
    
    this.walletService.balance.subscribe(newBalance => {
      this.balance = newBalance;
    });
    
    this.walletService.transactions.subscribe(newTransactions => {
      this.transactions = newTransactions;
    });

    this.walletService.cards.subscribe(newCards => {
      this.cards = newCards.map(card => ({
        id: card.id,
        numero: card.numero,
        titular: card.titular,
        dataValidade: card.dataValidade,
        cvv: card.cvv,
        tipo: this.mapCardType(card.tipo),
        bandeira: card.bandeira,
        padrao: card.padrao,
        ultimosQuatroDigitos: card.ultimosQuatroDigitos,
        favorito: card.favorito || false
      }));
      
      if (newCards.length > 0) {
        const defaultCard = newCards.find(card => card.padrao);
        if (defaultCard) {
          this.selectedCardForDeposit = defaultCard.id;
          this.depositForm.patchValue({
            cardId: defaultCard.id
          });
        }
      }
    });
  }

  goToTab(tabIndex: number): void {
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = tabIndex;
    }
  }

  deposit(): void {
    if (this.depositForm.valid) {
      const amount = parseFloat(this.depositForm.value.amount);
      const description = this.depositForm.value.description || 'Depósito';
      const cardId = this.depositForm.value.cardId;
      
      let success = false;
      
      if (cardId) {
        success = this.walletService.depositFromCard(amount, cardId, description);
      } else {
        success = this.walletService.deposit(amount, description);
      }
      
      if (success) {
        const notify = new Notyf();
        notify.success({
          message: `Depósito de R$ ${amount.toFixed(2)} realizado com sucesso`,
          position: { x: 'right', y: 'top' }
        });
        this.depositForm.reset();
        if (this.selectedCardForDeposit) {
          this.depositForm.patchValue({
            cardId: this.selectedCardForDeposit
          });
        }
      }
    }
  }

  withdraw(): void {
    if (this.withdrawForm.valid) {
      const amount = parseFloat(this.withdrawForm.value.amount);
      const description = this.withdrawForm.value.description || 'Saque';
      
      if (amount > this.balance) {
        const notify = new Notyf();
        notify.error({
          message: 'Saldo insuficiente para este saque',
          position: { x: 'right', y: 'top' }
        });
        return;
      }
      
      // Verificar configurações
      if (this.walletSettings.requererPinParaSaques) {
        this.verifyPinBeforeWithdraw(amount, description);
        return;
      }
      
      const success = this.walletService.withdraw(amount, description);
      
      if (success) {
        const notify = new Notyf();
        notify.success({
          message: `Saque de R$ ${amount.toFixed(2)} realizado com sucesso`,
          position: { x: 'right', y: 'top' }
        });
        this.withdrawForm.reset();
      }
    }
  }

  verifyPinBeforeWithdraw(amount: number, description: string): void {
    // Em um aplicativo real, isso seria implementado com um componente de diálogo
    const pin = prompt('Digite seu PIN de segurança para confirmar o saque:');
    
    if (pin === this.walletSettings.pinSeguranca) {
      const success = this.walletService.withdraw(amount, description);
      
      if (success) {
        const notify = new Notyf();
        notify.success({
          message: `Saque de R$ ${amount.toFixed(2)} realizado com sucesso`,
          position: { x: 'right', y: 'top' }
        });
        this.withdrawForm.reset();
      }
    } else {
      const notify = new Notyf();
      notify.error({
        message: 'PIN incorreto. Operação cancelada.',
        position: { x: 'right', y: 'top' }
      });
    }
  }

  addCard(): void {
    if (this.cardForm.valid) {
      // Convertendo para o formato da interface Cartao
      const cardData: Omit<Cartao, 'id' | 'ultimosQuatroDigitos'> = {
        numero: this.cardForm.value.cardNumber,
        titular: this.cardForm.value.holderName,
        dataValidade: this.cardForm.value.expiryDate,
        cvv: this.cardForm.value.cvv,
        tipo: this.mapCardType(this.cardForm.value.type),
        bandeira: this.cardForm.value.brand,
        padrao: this.cards.length === 0,
        favorito: false
      };
      
      const success = this.walletService.addCard(cardData);
      
      if (success) {
        const notify = new Notyf();
        notify.success({
          message: 'Cartão adicionado com sucesso',
          position: { x: 'right', y: 'top' }
        });
        this.cardForm.reset();
        this.cardForm.patchValue({
          type: 'credit'
        });
      }
    }
  }

  removeCard(cardId: string): void {
    const success = this.walletService.removeCard(cardId);
    
    if (success) {
      const notify = new Notyf();
      notify.success({
        message: 'Cartão removido com sucesso',
        position: { x: 'right', y: 'top' }
      });
    }
  }

  setDefaultCard(cardId: string): void {
    const success = this.walletService.setDefaultCard(cardId);
    
    if (success) {
      this.selectedCardForDeposit = cardId;
      this.depositForm.patchValue({
        cardId: cardId
      });
      
      const notify = new Notyf();
      notify.success({
        message: 'Cartão definido como padrão',
        position: { x: 'right', y: 'top' }
      });
    }
  }

  toggleFavoriteCard(cardId: string): void {
    const currentCards = [...this.cards];
    const cardIndex = currentCards.findIndex(card => card.id === cardId);
    
    if (cardIndex !== -1) {
      const updatedCards = [...currentCards];
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        favorito: !updatedCards[cardIndex].favorito
      };
      
      // Não precisa mais converter para outro formato, pois já estão no formato Cartao
      const success = this.walletService.updateCards(updatedCards);
      
      if (success) {
        const notify = new Notyf();
        notify.success({
          message: updatedCards[cardIndex].favorito 
            ? 'Cartão marcado como favorito' 
            : 'Cartão removido dos favoritos',
          position: { x: 'right', y: 'top' }
        });
      }
    }
  }

  openPinDialog(): void {
    // Em um aplicativo real, isso usaria um MatDialog
    const currentPin = this.walletSettings.pinSeguranca || '';
    
    if (currentPin) {
      const oldPin = prompt('Digite seu PIN atual:');
      if (oldPin !== currentPin) {
        alert('PIN incorreto!');
        return;
      }
    }
    
    const newPin = prompt('Digite seu novo PIN de segurança (4-6 dígitos):');
    if (newPin && /^\d{4,6}$/.test(newPin)) {
      this.walletSettings.pinSeguranca = newPin;
      this.saveSettings();
      
      const notify = new Notyf();
      notify.success({
        message: 'PIN de segurança alterado com sucesso',
        position: { x: 'right', y: 'top' }
      });
    } else {
      alert('PIN inválido. Deve conter de 4 a 6 dígitos numéricos.');
    }
  }

  saveSettings(): void {
    localStorage.setItem('walletSettings', JSON.stringify(this.walletSettings));
    
    const notify = new Notyf();
    notify.success({
      message: 'Configurações salvas com sucesso',
      position: { x: 'right', y: 'top' }
    });
  }

  getTransactionColor(transaction: Transacao): string {
    switch (transaction.tipo) {
      case 'deposito':
        return 'green';
      case 'saque':
        return 'red';
      case 'pagamento':
        return 'red';
      case 'reembolso':
        return 'green';
      default:
        return 'black';
    }
  }

  getTransactionIcon(transaction: Transacao): string {
    switch (transaction.tipo) {
      case 'deposito':
        return 'arrow_downward';
      case 'saque':
        return 'arrow_upward';
      case 'pagamento':
        return 'shopping_cart';
      case 'reembolso':
        return 'replay';
      default:
        return 'help';
    }
  }

  getCardBrandIcon(brand: string): string {
    switch (brand.toLowerCase()) {
      case 'visa': return 'visa-icon';
      case 'mastercard': return 'mastercard-icon';
      case 'american express': return 'amex-icon';
      case 'elo': return 'elo-icon';
      case 'hipercard': return 'hipercard-icon';
      default: return 'credit_card';
    }
  }

  getCardBrandImage(brand: string): string {
    const brandLower = brand.toLowerCase();
    switch (brandLower) {
      case 'visa': 
        return 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png';
      case 'mastercard': 
        return 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg';
      case 'american express': 
        return 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg';
      case 'elo': 
        return 'https://upload.wikimedia.org/wikipedia/commons/5/54/Elo_4Cores_Pos.png';
      case 'hipercard': 
        return 'https://upload.wikimedia.org/wikipedia/commons/8/89/Hipercard_logo.svg';
      default: 
        return 'assets/images/payment/card-generic.png';
    }
  }

  getFormattedCardNumber(cardNumber: string): string {
    return '•••• •••• •••• ' + cardNumber.slice(-4);
  }

  formatCardNumber(event: any): void {
    // Remover quaisquer caracteres que não sejam números
    let input = event.target.value.replace(/\D/g, '');
    
    // Limitar a 16 dígitos
    if (input.length > 16) {
      input = input.substring(0, 16);
    }
    
    // Atualizar o valor no formulário
    this.cardForm.get('cardNumber')?.setValue(input, { emitEvent: false });
  }

  formatExpiryDate(event: any): void {
    // Remover quaisquer caracteres não numéricos, exceto "/"
    let input = event.target.value.replace(/[^\d/]/g, '');
    
    // Remover barras extras ou duplicadas
    input = input.replace(/\/+/g, '/');
    
    // Se temos 2 dígitos e não tem barra, adicionar a barra
    if (input.length === 2 && !input.includes('/')) {
      input += '/';
    }
    
    // Se temos mais de 2 dígitos mas não tem barra, inserir a barra após os 2 primeiros dígitos
    if (input.length > 2 && !input.includes('/')) {
      input = input.substring(0, 2) + '/' + input.substring(2);
    }
    
    // Limitar ao formato MM/YY (5 caracteres incluindo a barra)
    if (input.includes('/')) {
      const [month, year] = input.split('/');
      
      // Limitar mês a 2 dígitos
      if (month.length > 2) {
        input = month.substring(0, 2) + '/' + (year || '');
      }
      
      // Limitar ano a 2 dígitos
      if (year && year.length > 2) {
        input = month + '/' + year.substring(0, 2);
      }
    }
    
    // Limitar tamanho total a 5 caracteres (MM/YY)
    if (input.length > 5) {
      input = input.substring(0, 5);
    }
    
    // Atualizar o valor no formulário
    this.cardForm.get('expiryDate')?.setValue(input, { emitEvent: false });
  }

  private mapTransactionType(type: string): 'deposito' | 'saque' | 'pagamento' | 'reembolso' | 'receita' {
    switch(type) {
      case 'deposit': return 'deposito';
      case 'withdrawal': return 'saque';
      case 'payment': return 'pagamento';
      case 'refund': return 'reembolso';
      case 'income': return 'receita';
      default: return 'deposito';
    }
  }
  
  private mapTransactionStatus(status: string): 'pendente' | 'concluido' | 'falhou' | 'cancelado' {
    switch(status) {
      case 'pending': return 'pendente';
      case 'completed': return 'concluido';
      case 'failed': return 'falhou';
      case 'canceled': return 'cancelado';
      default: return 'pendente';
    }
  }
  
  private mapCardType(type: string): 'credito' | 'debito' | 'ambos' {
    switch(type) {
      case 'credit': return 'credito';
      case 'debit': return 'debito';
      case 'both': return 'ambos';
      default: return 'credito';
    }
  }

  // Método auxiliar para converter de volta ao tipo esperado pelo serviço
  private reverseMapCardType(tipo: string): 'credit' | 'debit' | 'both' {
    switch(tipo) {
      case 'credito': return 'credit';
      case 'debito': return 'debit';
      case 'ambos': return 'both';
      default: return 'credit';
    }
  }
}
