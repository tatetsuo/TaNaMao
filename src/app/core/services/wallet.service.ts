import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund' | 'income'; // Adicionando 'income' como tipo válido
  serviceId?: string;
  serviceName?: string;
  freelancerId?: string;
  freelancerName?: string;
  status: 'pending' | 'completed' | 'failed' | 'canceled';
}

export interface Card {
  id: string;
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  cvv: string;
  type: 'credit' | 'debit' | 'both';
  brand: string;
  isDefault: boolean;
  lastFourDigits: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private balanceSubject: BehaviorSubject<number>;
  private transactionsSubject: BehaviorSubject<Transaction[]>;
  private cardsSubject: BehaviorSubject<Card[]>;
  
  public balance: Observable<number>;
  public transactions: Observable<Transaction[]>;
  public cards: Observable<Card[]>;

  constructor() {
    // Inicializa o saldo e transações do armazenamento local ou use valores padrão
    const savedBalance = localStorage.getItem('userBalance');
    const savedTransactions = localStorage.getItem('userTransactions');
    const savedCards = localStorage.getItem('userCards');
    
    this.balanceSubject = new BehaviorSubject<number>(savedBalance ? parseFloat(savedBalance) : 500);
    this.transactionsSubject = new BehaviorSubject<Transaction[]>(savedTransactions ? JSON.parse(savedTransactions) : this.getMockTransactions());
    this.cardsSubject = new BehaviorSubject<Card[]>(savedCards ? JSON.parse(savedCards) : []);
    
    this.balance = this.balanceSubject.asObservable();
    this.transactions = this.transactionsSubject.asObservable();
    this.cards = this.cardsSubject.asObservable();
    
    // Salva os valores iniciais se não existirem
    if (!savedBalance) {
      localStorage.setItem('userBalance', '500');
    }
    if (!savedTransactions) {
      localStorage.setItem('userTransactions', JSON.stringify(this.getMockTransactions()));
    }
    if (!savedCards) {
      localStorage.setItem('userCards', JSON.stringify([]));
    }
  }

  public getCurrentBalance(): number {
    return this.balanceSubject.value;
  }

  public getTransactions(): Transaction[] {
    return this.transactionsSubject.value;
  }

  public deposit(amount: number, description = 'Depósito'): boolean {
    if (amount <= 0) return false;
    
    const newTransaction: Transaction = {
      id: this.generateId(),
      date: new Date(),
      amount: amount,
      description: description,
      type: 'deposit',
      status: 'completed'
    };
    
    const newBalance = this.balanceSubject.value + amount;
    this.balanceSubject.next(newBalance);
    
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = [newTransaction, ...currentTransactions];
    this.transactionsSubject.next(updatedTransactions);
    
    // Atualiza o armazenamento local
    localStorage.setItem('userBalance', newBalance.toString());
    localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions));
    
    return true;
  }

  public withdraw(amount: number, description = 'Saque'): boolean {
    if (amount <= 0 || amount > this.balanceSubject.value) return false;
    
    const newTransaction: Transaction = {
      id: this.generateId(),
      date: new Date(),
      amount: -amount, // Valor negativo para saques
      description: description,
      type: 'withdrawal',
      status: 'completed'
    };
    
    const newBalance = this.balanceSubject.value - amount;
    this.balanceSubject.next(newBalance);
    
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = [newTransaction, ...currentTransactions];
    this.transactionsSubject.next(updatedTransactions);
    
    // Atualiza o armazenamento local
    localStorage.setItem('userBalance', newBalance.toString());
    localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions));
    
    return true;
  }

  public payForService(amount: number, serviceData: {
    id: string;
    title: string;
    freelancerName: string;
  }): boolean {
    if (amount <= 0 || amount > this.balanceSubject.value) return false;
    
    const newTransaction: Transaction = {
      id: this.generateId(),
      date: new Date(),
      amount: -amount, // Valor negativo para pagamentos
      description: `Pagamento por ${serviceData.title}`,
      type: 'payment',
      serviceId: serviceData.id,
      serviceName: serviceData.title,
      freelancerId: serviceData.id,
      freelancerName: serviceData.freelancerName,
      status: 'completed'
    };
    
    const newBalance = this.balanceSubject.value - amount;
    this.balanceSubject.next(newBalance);
    
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = [newTransaction, ...currentTransactions];
    this.transactionsSubject.next(updatedTransactions);
    
    // Atualiza o armazenamento local
    localStorage.setItem('userBalance', newBalance.toString());
    localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions));
    
    return true;
  }

  // Métodos para gerenciar cartões
  public getCards(): Card[] {
    return this.cardsSubject.value;
  }

  public addCard(card: Omit<Card, 'id' | 'lastFourDigits'>): boolean {
    try {
      const lastFourDigits = card.cardNumber.slice(-4);
      const newCard: Card = {
        ...card,
        id: this.generateId(),
        lastFourDigits: lastFourDigits,
        isDefault: this.cardsSubject.value.length === 0 // Primeiro cartão é o padrão
      };
      
      const currentCards = this.cardsSubject.value;
      const updatedCards = [...currentCards, newCard];
      this.cardsSubject.next(updatedCards);
      
      localStorage.setItem('userCards', JSON.stringify(updatedCards));
      return true;
    } catch (error) {
      console.error('Erro ao adicionar cartão:', error);
      return false;
    }
  }

  public removeCard(cardId: string): boolean {
    try {
      const currentCards = this.cardsSubject.value;
      const cardToRemove = currentCards.find(card => card.id === cardId);
      
      if (!cardToRemove) return false;
      
      const updatedCards = currentCards.filter(card => card.id !== cardId);
      this.cardsSubject.next(updatedCards);
      
      // Se o cartão removido era o padrão, definir o primeiro como padrão se houver
      if (cardToRemove.isDefault && updatedCards.length > 0) {
        this.setDefaultCard(updatedCards[0].id);
      } else {
        localStorage.setItem('userCards', JSON.stringify(updatedCards));
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao remover cartão:', error);
      return false;
    }
  }

  public setDefaultCard(cardId: string): boolean {
    try {
      const currentCards = this.cardsSubject.value;
      const updatedCards = currentCards.map(card => ({
        ...card,
        isDefault: card.id === cardId
      }));
      
      this.cardsSubject.next(updatedCards);
      localStorage.setItem('userCards', JSON.stringify(updatedCards));
      return true;
    } catch (error) {
      console.error('Erro ao definir cartão padrão:', error);
      return false;
    }
  }

  public depositFromCard(amount: number, cardId: string, description = 'Depósito via cartão'): boolean {
    if (amount <= 0) return false;
    
    const card = this.cardsSubject.value.find(c => c.id === cardId);
    if (!card) return false;
    
    const newTransaction: Transaction = {
      id: this.generateId(),
      date: new Date(),
      amount: amount,
      description: `${description} (${card.brand} final ${card.lastFourDigits})`,
      type: 'deposit',
      status: 'completed'
    };
    
    const newBalance = this.balanceSubject.value + amount;
    this.balanceSubject.next(newBalance);
    
    const currentTransactions = this.transactionsSubject.value;
    const updatedTransactions = [newTransaction, ...currentTransactions];
    this.transactionsSubject.next(updatedTransactions);
    
    localStorage.setItem('userBalance', newBalance.toString());
    localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions));
    
    return true;
  }

  public updateCards(cards: Card[]): boolean {
    try {
      this.cardsSubject.next(cards);
      localStorage.setItem('userCards', JSON.stringify(cards));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar cartões:', error);
      return false;
    }
  }

  addTransaction(transaction: Transaction): void {
    // Obter o saldo e transações atuais
    const currentBalance = this.balanceSubject.value;
    const currentTransactions = this.transactionsSubject.value;
    
    // Calcular novo saldo
    const newBalance = transaction.type === 'deposit' || transaction.type === 'income' || transaction.type === 'refund'
      ? currentBalance + transaction.amount 
      : currentBalance - transaction.amount;
    
    // Atualizar o saldo
    this.balanceSubject.next(newBalance);
    
    // Adicionar a nova transação na lista
    const updatedTransactions = [transaction, ...currentTransactions];
    this.transactionsSubject.next(updatedTransactions);
    
    // Salvar no localStorage
    localStorage.setItem('userBalance', newBalance.toString());
    localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions));
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private getMockTransactions(): Transaction[] {
    const now = new Date();
    return [
      {
        id: this.generateId(),
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        amount: -150,
        description: 'Pintura Residencial',
        type: 'payment',
        serviceId: '1',
        serviceName: 'Pintura Residencial Profissional',
        freelancerId: '101',
        freelancerName: 'João Silva',
        status: 'completed'
      },
      {
        id: this.generateId(),
        date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        amount: 300,
        description: 'Depósito via PIX',
        type: 'deposit',
        status: 'completed'
      },
      {
        id: this.generateId(),
        date: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        amount: -200,
        description: 'Limpeza Residencial',
        type: 'payment',
        serviceId: '12',
        serviceName: 'Limpeza Residencial',
        freelancerId: '112',
        freelancerName: 'Marina Costa',
        status: 'completed'
      }
    ];
  }
}
