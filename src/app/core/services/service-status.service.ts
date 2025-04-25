import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ContratoServico } from '../interfaces/padroes';

@Injectable({
  providedIn: 'root'
})
export class ServiceStatusService {
  private contractsSubject: BehaviorSubject<ContratoServico[]>;
  public contracts: Observable<ContratoServico[]>;

  constructor() {
    // Inicializa os contratos do armazenamento local ou usa valores padrão
    const savedContracts = localStorage.getItem('serviceContracts');
    this.contractsSubject = new BehaviorSubject<ContratoServico[]>(savedContracts ? JSON.parse(savedContracts) : []);
    this.contracts = this.contractsSubject.asObservable();
  }

  public getContracts(): ContratoServico[] {
    return this.contractsSubject.value;
  }

  public getContractById(id: string): ContratoServico | undefined {
    return this.contractsSubject.value.find(contract => contract.id === id);
  }

  public addContract(contract: Omit<ContratoServico, 'id' | 'dataCriacao'>): ContratoServico {
    const newContract: ContratoServico = {
      ...contract,
      id: this.generateId(),
      dataCriacao: new Date(),
      status: 'agendado'
    };
    
    const currentContracts = this.contractsSubject.value;
    const updatedContracts = [newContract, ...currentContracts];
    this.contractsSubject.next(updatedContracts);
    
    // Atualiza o armazenamento local
    localStorage.setItem('serviceContracts', JSON.stringify(updatedContracts));
    
    return newContract;
  }

  public updateContractStatus(contractId: string, newStatus: ContratoServico['status']): boolean {
    const currentContracts = this.contractsSubject.value;
    const contractIndex = currentContracts.findIndex(c => c.id === contractId);
    
    if (contractIndex === -1) return false;
    
    const updatedContract = {
      ...currentContracts[contractIndex],
      status: newStatus,
      dataAtualizacao: new Date()
    };
    
    const updatedContracts = [...currentContracts];
    updatedContracts[contractIndex] = updatedContract;
    this.contractsSubject.next(updatedContracts);
    
    // Atualiza o armazenamento local
    localStorage.setItem('serviceContracts', JSON.stringify(updatedContracts));
    
    return true;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
