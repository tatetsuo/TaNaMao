import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ServiceContract {
  id: string;
  serviceId: string;
  title: string;
  freelancerId: string;
  freelancerName: string;
  freelancerImage: string;
  price: number;
  scheduledDate: Date;
  scheduledTime: string;
  location: string;
  status: 'agendado' | 'confirmado' | 'em-andamento' | 'concluido' | 'cancelado';
  additionalRequirements?: string;
  paymentMethod: string;
  totalPaid: number;
  createdAt: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceStatusService {
  private contractsSubject: BehaviorSubject<ServiceContract[]>;
  public contracts: Observable<ServiceContract[]>;

  constructor() {
    // Inicializa os contratos do armazenamento local ou usa valores padrão
    const savedContracts = localStorage.getItem('serviceContracts');
    this.contractsSubject = new BehaviorSubject<ServiceContract[]>(savedContracts ? JSON.parse(savedContracts) : []);
    this.contracts = this.contractsSubject.asObservable();
  }

  public getContracts(): ServiceContract[] {
    return this.contractsSubject.value;
  }

  public getContractById(id: string): ServiceContract | undefined {
    return this.contractsSubject.value.find(contract => contract.id === id);
  }

  public addContract(contract: Omit<ServiceContract, 'id' | 'createdAt'>): ServiceContract {
    const newContract: ServiceContract = {
      ...contract,
      id: this.generateId(),
      createdAt: new Date(),
      status: 'agendado'
    };
    
    const currentContracts = this.contractsSubject.value;
    const updatedContracts = [newContract, ...currentContracts];
    this.contractsSubject.next(updatedContracts);
    
    // Atualiza o armazenamento local
    localStorage.setItem('serviceContracts', JSON.stringify(updatedContracts));
    
    return newContract;
  }

  public updateContractStatus(contractId: string, newStatus: ServiceContract['status']): boolean {
    const currentContracts = this.contractsSubject.value;
    const contractIndex = currentContracts.findIndex(c => c.id === contractId);
    
    if (contractIndex === -1) return false;
    
    const updatedContract = {
      ...currentContracts[contractIndex],
      status: newStatus,
      updatedAt: new Date()
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
