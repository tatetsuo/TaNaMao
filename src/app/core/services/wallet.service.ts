import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cartao, Transacao } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private balanceSubject: BehaviorSubject<number>;
  private transactionsSubject: BehaviorSubject<Transacao[]>;
  private cardsSubject: BehaviorSubject<Cartao[]>;
  
  public balance: Observable<number>;
  public transactions: Observable<Transacao[]>;
  public cards: Observable<Cartao[]>;

  constructor() {
    // Inicializa o saldo e transações do armazenamento local ou use valores padrão
    const savedBalance = localStorage.getItem('userBalance');
    const savedTransactions = localStorage.getItem('userTransactions');
    const savedCards = localStorage.getItem('userCards');
    
    this.balanceSubject = new BehaviorSubject<number>(savedBalance ? parseFloat(savedBalance) : 500);
    this.transactionsSubject = new BehaviorSubject<Transacao[]>(savedTransactions ? JSON.parse(savedTransactions) : this.getMockTransactions());
    this.cardsSubject = new BehaviorSubject<Cartao[]>(savedCards ? JSON.parse(savedCards) : []);
    
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

  public getTransactions(): Transacao[] {
    return this.transactionsSubject.value;
  }

  public deposit(amount: number, description = 'Depósito'): boolean {
    if (amount <= 0) return false;
    
    const newTransaction: Transacao = {
      id: this.generateId(),
      data: new Date(),
      valor: amount,
      descricao: description,
      tipo: 'deposito',
      status: 'concluido'
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
    
    const newTransaction: Transacao = {
      id: this.generateId(),
      data: new Date(),
      valor: -amount, // Valor negativo para saques
      descricao: description,
      tipo: 'saque',
      status: 'concluido'
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
    
    const newTransaction: Transacao = {
      id: this.generateId(),
      data: new Date(),
      valor: -amount, // Valor negativo para pagamentos
      descricao: `Pagamento por ${serviceData.title}`,
      tipo: 'pagamento',
      servicoId: serviceData.id,
      nomeServico: serviceData.title,
      colaboradorId: serviceData.id,
      nomeColaborador: serviceData.freelancerName,
      status: 'concluido'
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
  public getCards(): Cartao[] {
    return this.cardsSubject.value;
  }

  public addCard(card: Omit<Cartao, 'id' | 'ultimosQuatroDigitos'>): boolean {
    try {
      const lastFourDigits = card.numero.slice(-4);
      const newCard: Cartao = {
        ...card,
        id: this.generateId(),
        ultimosQuatroDigitos: lastFourDigits,
        padrao: this.cardsSubject.value.length === 0 // Primeiro cartão é o padrão
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
      if (cardToRemove.padrao && updatedCards.length > 0) {
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
        padrao: card.id === cardId
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
    
    const newTransaction: Transacao = {
      id: this.generateId(),
      data: new Date(),
      valor: amount,
      descricao: `${description} (${card.bandeira} final ${card.ultimosQuatroDigitos})`,
      tipo: 'deposito',
      status: 'concluido'
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

  public updateCards(cards: Cartao[]): boolean {
    try {
      this.cardsSubject.next(cards);
      localStorage.setItem('userCards', JSON.stringify(cards));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar cartões:', error);
      return false;
    }
  }

  addTransaction(transaction: { 
    id: string; 
    amount: number; 
    date: Date; 
    description: string; 
    type: string; 
    status: string;
    serviceId?: string;
    serviceName?: string;
    freelancerId?: string;
    freelancerName?: string; 
  }): void {
    // Converter para formato da interface Transacao
    const transacao: Transacao = {
      id: transaction.id,
      data: transaction.date,
      valor: transaction.amount,
      descricao: transaction.description,
      tipo: this.mapTransactionType(transaction.type),
      servicoId: transaction.serviceId,
      nomeServico: transaction.serviceName,
      colaboradorId: transaction.freelancerId,
      nomeColaborador: transaction.freelancerName,
      status: this.mapTransactionStatus(transaction.status)
    };
    
    // Obter o saldo e transações atuais
    const currentBalance = this.balanceSubject.value;
    const currentTransactions = this.transactionsSubject.value;
    
    // Calcular novo saldo
    let newBalance = currentBalance;
    if (transacao.tipo === 'deposito' || transacao.tipo === 'receita' || transacao.tipo === 'reembolso') {
      newBalance += transacao.valor;
    } else {
      newBalance -= Math.abs(transacao.valor);
    }
    
    // Atualizar o saldo
    this.balanceSubject.next(newBalance);
    
    // Adicionar a nova transação na lista
    const updatedTransactions = [transacao, ...currentTransactions];
    this.transactionsSubject.next(updatedTransactions);
    
    // Salvar no localStorage
    localStorage.setItem('userBalance', newBalance.toString());
    localStorage.setItem('userTransactions', JSON.stringify(updatedTransactions));
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

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private getMockTransactions(): Transacao[] {
    const now = new Date();
    return [
      {
        id: this.generateId(),
        data: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        valor: -150,
        descricao: 'Pintura Residencial',
        tipo: 'pagamento',
        servicoId: '1',
        nomeServico: 'Pintura Residencial Profissional',
        colaboradorId: '101',
        nomeColaborador: 'João Silva',
        status: 'concluido'
      },
      {
        id: this.generateId(),
        data: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        valor: 300,
        descricao: 'Depósito via PIX',
        tipo: 'deposito',
        status: 'concluido'
      },
      {
        id: this.generateId(),
        data: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        valor: -200,
        descricao: 'Limpeza Residencial',
        tipo: 'pagamento',
        servicoId: '12',
        nomeServico: 'Limpeza Residencial',
        colaboradorId: '112',
        nomeColaborador: 'Marina Costa',
        status: 'concluido'
      }
    ];
  }
}
