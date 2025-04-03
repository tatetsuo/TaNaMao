import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
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
import { AuthService, User } from 'src/app/core/services/auth.service';
import { WalletService } from 'src/app/core/services/wallet.service';
import { Notyf } from 'notyf';

interface JobSchedule {
  id: number;
  clientName: string;
  address: string;
  date: string;
  time: string;
  service: string;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  distance?: string;
  clientPhoto?: string;
}

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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './prestador-dashboard.component.html',
  styleUrls: ['./prestador-dashboard.component.scss']
})
export class PrestadorDashboardComponent implements OnInit {
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
  upcomingJobsDataSource!: MatTableDataSource<JobSchedule>;
  completedJobsDataSource!: MatTableDataSource<JobSchedule>;
  
  // Colunas para tabelas
  upcomingColumns: string[] = ['client', 'details', 'date', 'price', 'status', 'actions'];
  completedColumns: string[] = ['client', 'details', 'date', 'price', 'rating'];
  
  // Estatísticas
  completionRate = 85;
  responseRate = 92;
  reviewScore = 4.7;
  
  // Trabalhos agendados mais próximos
  upcomingJobs: JobSchedule[] = [
    {
      id: 1,
      clientName: 'Carlos Mendes',
      address: 'Rua das Flores, 123 - Jardim Botânico',
      date: '2023-06-15',
      time: '14:00',
      service: 'Jardinagem',
      price: 120,
      status: 'confirmed',
      distance: '2.5 km',
      clientPhoto: 'assets/images/user/avatar-1.jpg'
    },
    {
      id: 2,
      clientName: 'Ana Paula Silva',
      address: 'Av. Central, 456 - Asa Sul',
      date: '2023-06-16',
      time: '10:00',
      service: 'Jardinagem',
      price: 150,
      status: 'pending',
      distance: '4.8 km',
      clientPhoto: 'assets/images/user/avatar-3.jpg'
    },
    {
      id: 3,
      clientName: 'Roberto Gomes',
      address: 'Quadra 5, Conjunto B - Lago Norte',
      date: '2023-06-17',
      time: '16:30',
      service: 'Jardinagem',
      price: 180,
      status: 'confirmed',
      distance: '7.2 km',
      clientPhoto: 'assets/images/user/avatar-2.jpg'
    }
  ];
  
  // Histórico de trabalhos concluídos
  completedJobs: JobSchedule[] = [
    {
      id: 101,
      clientName: 'Márcia Oliveira',
      address: 'Rua 10, Casa 8 - Lago Sul',
      date: '2023-06-10',
      time: '09:00',
      service: 'Jardinagem',
      price: 200,
      status: 'completed',
      clientPhoto: 'assets/images/user/avatar-2.jpg'
    },
    {
      id: 102,
      clientName: 'Paulo Henrique',
      address: 'SQN 214, Bloco C - Asa Norte',
      date: '2023-06-08',
      time: '14:30',
      service: 'Jardinagem',
      price: 130,
      status: 'completed',
      clientPhoto: 'assets/images/user/avatar-1.jpg'
    },
    {
      id: 103,
      clientName: 'Fernanda Costa',
      address: 'SHIS QI 15, Conjunto 8 - Lago Sul',
      date: '2023-06-05',
      time: '11:00',
      service: 'Jardinagem',
      price: 250,
      status: 'completed',
      clientPhoto: 'assets/images/user/avatar-3.jpg'
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
    
    // Filtro customizado para pesquisa
    this.upcomingJobsDataSource.filterPredicate = (data: JobSchedule, filter: string) => {
      return data.clientName.toLowerCase().includes(filter) || 
             data.service.toLowerCase().includes(filter) || 
             data.address.toLowerCase().includes(filter);
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
      job.status = 'confirmed';
      
      // Atualiza o datasource
      this.upcomingJobsDataSource.data = [...this.upcomingJobs];
      
      const notyf = new Notyf();
      notyf.success({
        message: `Trabalho para ${job.clientName} confirmado com sucesso!`,
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
      job.status = 'completed';
      
      // Adiciona ao histórico de trabalhos concluídos
      this.completedJobs.unshift({...job});
      this.completedJobsDataSource.data = [...this.completedJobs];
      
      // Remove dos trabalhos agendados
      this.upcomingJobs.splice(jobIndex, 1);
      this.upcomingJobsDataSource.data = [...this.upcomingJobs];
      
      // Atualiza o saldo (simulação)
      this.walletService.addTransaction({
        id: Date.now().toString(),
        amount: job.price,
        date: new Date(),
        description: `Pagamento por ${job.service} para ${job.clientName}`,
        type: 'deposit',
        status: 'completed'
      });
      
      const notyf = new Notyf();
      notyf.success({
        message: `Trabalho concluído! Recebido R$ ${job.price.toFixed(2)}`,
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
      job.status = 'cancelled';
      
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
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  }
  
  // Método para obter a tradução do status
  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Aguardando';
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
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

