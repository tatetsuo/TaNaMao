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
import { JobDetailsModalComponent } from './job-details-modal/job-details-modal.component';

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
      clientName: 'Carlos Mendes',
      clientPhoto: 'https://randomuser.me/api/portraits/men/78.jpg',
      address: 'Rua das Flores, 123 - Jardim Botânico',
      date: '2023-06-15',
      time: '14:00',
      service: 'Jardinagem',
      price: 120,
      status: 'confirmado',
      distance: '2.5 km',
      nomeCliente: 'Carlos Mendes',
      endereco: 'Rua das Flores, 123 - Jardim Botânico',
      data: '2023-06-15',
      hora: '14:00',
      servico: 'Jardinagem',
      preco: 120,
      fotoCliente: 'https://randomuser.me/api/portraits/men/78.jpg'
    },
    {
      id: 2,
      clientName: 'Ana Paula Silva',
      clientPhoto: 'https://randomuser.me/api/portraits/women/66.jpg',
      address: 'Av. Central, 456 - Asa Sul',
      date: '2023-06-16',
      time: '10:00',
      service: 'Poda de Árvores',
      price: 150,
      status: 'pendente',
      distance: '4.8 km',
      nomeCliente: 'Ana Paula Silva',
      endereco: 'Av. Central, 456 - Asa Sul',
      data: '2023-06-16',
      hora: '10:00',
      servico: 'Poda de Árvores',
      preco: 150,
      fotoCliente: 'https://randomuser.me/api/portraits/women/66.jpg'
    },
    {
      id: 3,
      clientName: 'Roberto Gomes',
      clientPhoto: 'https://randomuser.me/api/portraits/men/45.jpg',
      address: 'Quadra 5, Conjunto B - Lago Norte',
      date: '2023-06-17',
      time: '16:30',
      service: 'Plantio de Mudas',
      price: 180,
      status: 'confirmado',
      distance: '7.2 km',
      nomeCliente: 'Roberto Gomes',
      endereco: 'Quadra 5, Conjunto B - Lago Norte',
      data: '2023-06-17',
      hora: '16:30',
      servico: 'Plantio de Mudas',
      preco: 180,
      fotoCliente: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
      id: 4,
      clientName: 'Juliana Martins',
      clientPhoto: 'https://randomuser.me/api/portraits/women/33.jpg',
      address: 'SQS 308, Bloco D - Asa Sul',
      date: '2023-06-18',
      time: '09:00',
      service: 'Manutenção de Gramado',
      price: 200,
      status: 'pendente',
      distance: '3.1 km',
      nomeCliente: 'Juliana Martins',
      endereco: 'SQS 308, Bloco D - Asa Sul',
      data: '2023-06-18',
      hora: '09:00',
      servico: 'Manutenção de Gramado',
      preco: 200,
      fotoCliente: 'https://randomuser.me/api/portraits/women/33.jpg'
    },
    {
      id: 5,
      clientName: 'Fábio Almeida',
      clientPhoto: 'https://randomuser.me/api/portraits/men/22.jpg',
      address: 'SMPW Q26, Cj 3 - Park Way',
      date: '2023-06-19',
      time: '15:00',
      service: 'Paisagismo',
      price: 350,
      status: 'confirmado',
      distance: '10.5 km',
      nomeCliente: 'Fábio Almeida',
      endereco: 'SMPW Q26, Cj 3 - Park Way',
      data: '2023-06-19',
      hora: '15:00',
      servico: 'Paisagismo',
      preco: 350,
      fotoCliente: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ];
  
  // Histórico de trabalhos concluídos
  completedJobs: AgendamentoServico[] = [
    {
      id: 101,
      clientName: 'Márcia Oliveira',
      clientPhoto: 'https://randomuser.me/api/portraits/women/12.jpg',
      address: 'Rua 10, Casa 8 - Lago Sul',
      date: '2023-06-10',
      time: '09:00',
      service: 'Jardinagem Completa',
      price: 200,
      status: 'concluido',
      nomeCliente: 'Márcia Oliveira',
      endereco: 'Rua 10, Casa 8 - Lago Sul',
      data: '2023-06-10',
      hora: '09:00',
      servico: 'Jardinagem Completa',
      preco: 200,
      fotoCliente: 'https://randomuser.me/api/portraits/women/12.jpg'
    },
    {
      id: 102,
      clientName: 'Paulo Henrique',
      clientPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      address: 'SQN 214, Bloco C - Asa Norte',
      date: '2023-06-08',
      time: '14:30',
      service: 'Plantio de Árvores',
      price: 130,
      status: 'concluido',
      nomeCliente: 'Paulo Henrique',
      endereco: 'SQN 214, Bloco C - Asa Norte',
      data: '2023-06-08',
      hora: '14:30',
      servico: 'Plantio de Árvores',
      preco: 130,
      fotoCliente: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 103,
      clientName: 'Fernanda Costa',
      clientPhoto: 'https://randomuser.me/api/portraits/women/11.jpg',
      address: 'SHIS QI 15, Conjunto 8 - Lago Sul',
      date: '2023-06-05',
      time: '11:00',
      service: 'Poda de Árvores',
      price: 250,
      status: 'concluido',
      nomeCliente: 'Fernanda Costa',
      endereco: 'SHIS QI 15, Conjunto 8 - Lago Sul',
      data: '2023-06-05',
      hora: '11:00',
      servico: 'Poda de Árvores',
      preco: 250,
      fotoCliente: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    {
      id: 104,
      clientName: 'Ricardo Monteiro',
      clientPhoto: 'https://randomuser.me/api/portraits/men/56.jpg',
      address: 'SHIN QL 10, Conjunto 2 - Lago Norte',
      date: '2023-06-03',
      time: '10:30',
      service: 'Manutenção de Jardim',
      price: 180,
      status: 'concluido',
      nomeCliente: 'Ricardo Monteiro',
      endereco: 'SHIN QL 10, Conjunto 2 - Lago Norte',
      data: '2023-06-03',
      hora: '10:30',
      servico: 'Manutenção de Jardim',
      preco: 180,
      fotoCliente: 'https://randomuser.me/api/portraits/men/56.jpg'
    },
    {
      id: 105,
      clientName: 'Carla Pereira',
      clientPhoto: 'https://randomuser.me/api/portraits/women/42.jpg',
      address: 'SQS 108, Bloco F - Asa Sul',
      date: '2023-06-01',
      time: '13:00',
      service: 'Instalação de Irrigação',
      price: 300,
      status: 'concluido',
      nomeCliente: 'Carla Pereira',
      endereco: 'SQS 108, Bloco F - Asa Sul',
      data: '2023-06-01',
      hora: '13:00',
      servico: 'Instalação de Irrigação',
      preco: 300,
      fotoCliente: 'https://randomuser.me/api/portraits/women/42.jpg'
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
    
    // Define filterPredicate para melhorar a busca nas tabelas
    this.upcomingJobsDataSource.filterPredicate = (data: AgendamentoServico, filter: string) => {
      const filterValue = filter.toLowerCase().trim();
      return (
        (data.clientName?.toLowerCase().includes(filterValue) || false) || 
        (data.service?.toLowerCase().includes(filterValue) || false) || 
        (data.address?.toLowerCase().includes(filterValue) || false) ||
        (data.date ? this.formatDate(data.date).includes(filterValue) : false) ||
        (data.status?.toLowerCase().includes(filterValue) || false)
      );
    };
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
  
  // Método para visualizar detalhes de um trabalho
  viewJobDetails(jobId: number): void {
    const job = this.upcomingJobs.find(j => j.id === jobId);
    
    if (job) {
      const dialogRef = this.dialog.open(JobDetailsModalComponent, {
        width: '600px',
        data: job
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          switch (result.action) {
            case 'confirm':
              this.confirmJob(result.jobId);
              break;
            case 'complete':
              this.completeJob(result.jobId);
              break;
            case 'cancel':
              this.cancelJob(result.jobId);
              break;
          }
        }
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

  /**
   * Trata erros de carregamento de imagens substituindo por uma imagem padrão
   */
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/user/avatar-2.jpg'; // Imagem de fallback
    imgElement.onerror = null; // Previne loop infinito
  }
}

