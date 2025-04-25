import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { Notyf } from 'notyf';
import { AgendamentoServico } from 'src/app/core/interfaces/colaborador';

@Component({
  selector: 'app-prestador-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './prestador-dashboard.component.html',
  styleUrls: ['./prestador-dashboard.component.scss']
})
export class PrestadorDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentUser: User | null = null;
  balance = 0;
  earnings = {
    today: 0,
    week: 180,
    month: 780
  };
  
  // Fonte de dados para tabelas Material
  upcomingJobsDataSource!: MatTableDataSource<AgendamentoServico>;
  completedJobsDataSource!: MatTableDataSource<AgendamentoServico>;
  
  // Colunas para tabelas
  upcomingColumns: string[] = ['client', 'details', 'date', 'price', 'status', 'actions'];
  completedColumns: string[] = ['client', 'details', 'date', 'price', 'rating'];
  
  // Estatísticas
  completionRate = 85;
  responseRate = 92;
  reviewScore = 4.7;
  
  // Trabalhos agendados mais próximos
  upcomingJobs: AgendamentoServico[] = [
    {
      id: 1,
      nomeCliente: 'Carlos Mendes',
      endereco: 'Rua das Flores, 123 - Jardim Botânico',
      data: '2023-06-15',
      hora: '14:00',
      servico: 'Jardinagem',
      preco: 120,
      status: 'confirmado',
      distancia: '2.5 km',
      fotoCliente: 'assets/images/user/avatar-1.jpg'
    },
    {
      id: 2,
      nomeCliente: 'Ana Paula Silva',
      endereco: 'Av. Central, 456 - Asa Sul',
      data: '2023-06-16',
      hora: '10:00',
      servico: 'Jardinagem',
      preco: 150,
      status: 'pendente',
      distancia: '4.8 km',
      fotoCliente: 'assets/images/user/avatar-3.jpg'
    },
    {
      id: 3,
      nomeCliente: 'Roberto Gomes',
      endereco: 'Quadra 5, Conjunto B - Lago Norte',
      data: '2023-06-17',
      hora: '16:30',
      servico: 'Jardinagem',
      preco: 180,
      status: 'confirmado',
      distancia: '7.2 km',
      fotoCliente: 'assets/images/user/avatar-2.jpg'
    }
  ];
  
  // Histórico de trabalhos concluídos
  completedJobs: AgendamentoServico[] = [
    {
      id: 101,
      nomeCliente: 'Márcia Oliveira',
      endereco: 'Rua 10, Casa 8 - Lago Sul',
      data: '2023-06-10',
      hora: '09:00',
      servico: 'Jardinagem',
      preco: 200,
      status: 'concluido',
      fotoCliente: 'assets/images/user/avatar-2.jpg'
    },
    {
      id: 102,
      nomeCliente: 'Paulo Henrique',
      endereco: 'SQN 214, Bloco C - Asa Norte',
      data: '2023-06-08',
      hora: '14:30',
      servico: 'Jardinagem',
      preco: 130,
      status: 'concluido',
      fotoCliente: 'assets/images/user/avatar-1.jpg'
    },
    {
      id: 103,
      nomeCliente: 'Fernanda Costa',
      endereco: 'SHIS QI 15, Conjunto 8 - Lago Sul',
      data: '2023-06-05',
      hora: '11:00',
      servico: 'Jardinagem',
      preco: 250,
      status: 'concluido',
      fotoCliente: 'assets/images/user/avatar-3.jpg'
    }
  ];
  
  // Estatísticas mensais
  monthlyStats = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    earnings: [520, 650, 780, 590, 730, 780],
    jobs: [5, 7, 8, 6, 8, 9]
  };

  constructor(
    private authService: AuthService,
    private walletService: WalletService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.walletService.balance.subscribe(value => {
      this.balance = value;
    });

    // Inicializa os datasources para as tabelas Material
    this.upcomingJobsDataSource = new MatTableDataSource(this.upcomingJobs);
    this.completedJobsDataSource = new MatTableDataSource(this.completedJobs);
  }
  
  ngAfterViewInit(): void {
    // Configura o paginator e sort para as tabelas
    this.upcomingJobsDataSource.paginator = this.paginator;
    this.upcomingJobsDataSource.sort = this.sort;
    
    // Configuração aprimorada do filtro para pesquisa
    this.upcomingJobsDataSource.filterPredicate = (data: AgendamentoServico, filter: string) => {
      const filterValue = filter.toLowerCase().trim();
      return data.nomeCliente.toLowerCase().includes(filterValue) || 
             data.servico.toLowerCase().includes(filterValue) || 
             data.endereco.toLowerCase().includes(filterValue) ||
             this.formatDate(data.data).includes(filterValue) ||
             data.status.toLowerCase().includes(filterValue);
    };
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.upcomingJobsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.upcomingJobsDataSource.paginator) {
      this.upcomingJobsDataSource.paginator.firstPage();
    }
  }

  // Método para confirmar um trabalho agendado
  confirmJob(jobId: number): void {
    const job = this.upcomingJobs.find(j => j.id === jobId);
    if (job) {
      job.status = 'confirmado';
      
      // Atualiza o datasource
      this.upcomingJobsDataSource.data = [...this.upcomingJobs];
      
      const notyf = new Notyf();
      notyf.success({
        message: `Trabalho para ${job.nomeCliente} confirmado com sucesso!`,
        position: { x: 'right', y: 'top' },
        duration: 3000
      });
    }
  }

  // Método para marcar um trabalho como concluído
  completeJob(jobId: number): void {
    const jobIndex = this.upcomingJobs.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
      const job = this.upcomingJobs[jobIndex];
      job.status = 'concluido';
      
      // Adiciona ao histórico de trabalhos concluídos
      this.completedJobs.unshift({...job});
      this.completedJobsDataSource.data = [...this.completedJobs];
      
      // Remove dos trabalhos agendados
      this.upcomingJobs.splice(jobIndex, 1);
      this.upcomingJobsDataSource.data = [...this.upcomingJobs];
      
      // Atualiza o saldo (simulação)
      this.walletService.addTransaction({
        id: Date.now().toString(),
        amount: job.preco,
        date: new Date(),
        description: `Pagamento por ${job.servico} para ${job.nomeCliente}`,
        type: 'income',
        status: 'completed' // Isso será convertido para 'concluido' no service
      });
      
      const notyf = new Notyf();
      notyf.success({
        message: `Trabalho concluído! Recebido R$ ${job.preco.toFixed(2)}`,
        position: { x: 'right', y: 'top' },
        duration: 3000
      });
    }
  }

  // Método para cancelar um trabalho
  cancelJob(jobId: number): void {
    const jobIndex = this.upcomingJobs.findIndex(j => j.id === jobId);
    if (jobIndex !== -1) {
      const job = this.upcomingJobs[jobIndex];
      job.status = 'cancelado';
      
      // Atualiza o datasource
      this.upcomingJobsDataSource.data = [...this.upcomingJobs];
      
      // Remove dos trabalhos agendados depois de um tempo
      setTimeout(() => {
        this.upcomingJobs.splice(jobIndex, 1);
        this.upcomingJobsDataSource.data = [...this.upcomingJobs];
      }, 2000);
      
      const notyf = new Notyf();
      notyf.error({
        message: `Trabalho cancelado`,
        position: { x: 'right', y: 'top' },
        duration: 3000
      });
    }
  }
  
  // Método para obter a classe CSS com base no status
  getStatusClass(status: string): string {
    switch (status) {
      case 'pendente': return 'status-pending';
      case 'confirmado': return 'status-confirmed';
      case 'concluido': return 'status-completed';
      case 'cancelado': return 'status-cancelled';
      default: return '';
    }
  }
  
  // Método para obter a tradução do status
  getStatusText(status: string): string {
    switch (status) {
      case 'pendente': return 'Aguardando';
      case 'confirmado': return 'Confirmado';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  }
  
  // Método para formatar a data
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }
  
  // Método para gerar array para as estrelas de avaliação
  getStarArray(count: number): number[] {
    return Array(count).fill(0);
  }
}

