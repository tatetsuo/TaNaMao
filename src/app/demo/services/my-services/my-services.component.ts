import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { ActivatedRoute } from '@angular/router';
import { ServiceStatusService, ServiceContract } from 'src/app/core/services/service-status.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-my-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatBadgeModule,
    MatChipsModule,
    CardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './my-services.component.html',
  styleUrls: ['./my-services.component.scss']
})
export class MyServicesComponent implements OnInit {
  contracts: ServiceContract[] = [];
  activeContracts: ServiceContract[] = [];
  completedContracts: ServiceContract[] = [];
  
  constructor(
    private serviceStatusService: ServiceStatusService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.contracts = this.serviceStatusService.getContracts();
    this.filterContracts();
    
    this.route.queryParams.subscribe(params => {
      if (params['contractId']) {
        const contract = this.contracts.find(c => c.id === params['contractId']);
        if (contract) {
          // Destaque o contrato selecionado via parâmetros da URL
          setTimeout(() => {
            const element = document.getElementById(`contract-${contract.id}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
              element.classList.add('highlight-contract');
              setTimeout(() => element.classList.remove('highlight-contract'), 3000);
            }
          }, 500);
        }
      }
    });
  }

  private filterContracts(): void {
    this.activeContracts = this.contracts.filter(
      contract => ['agendado', 'confirmado', 'em-andamento'].includes(contract.status)
    );
    
    this.completedContracts = this.contracts.filter(
      contract => ['concluido', 'cancelado'].includes(contract.status)
    );
  }

  getStatusLabel(status: string): string {
    const statusMap: Record<string, string> = {
      'agendado': 'Agendado',
      'confirmado': 'Confirmado',
      'em-andamento': 'Em andamento',
      'concluido': 'Concluído',
      'cancelado': 'Cancelado'
    };
    
    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'agendado': 'accent',
      'confirmado': 'primary',
      'em-andamento': 'primary',
      'concluido': 'primary',
      'cancelado': 'warn'
    };
    
    return colorMap[status] || '';
  }

  getStatusIcon(status: string): string {
    const iconMap: Record<string, string> = {
      'agendado': 'schedule',
      'confirmado': 'check_circle',
      'em-andamento': 'engineering',
      'concluido': 'task_alt',
      'cancelado': 'cancel'
    };
    
    return iconMap[status] || 'help';
  }
}
