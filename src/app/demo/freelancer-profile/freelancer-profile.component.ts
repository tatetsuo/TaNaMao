import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { AuthService, User } from 'src/app/core/services/auth.service';
import { Notyf } from 'notyf';
import { HistoricoTrabalho, Habilidade } from 'src/app/core/interfaces/colaborador';

// Interface para os dados da tabela de histórico de trabalhos


@Component({
  selector: 'app-freelancer-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatStepperModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Adicionando schema para elementos personalizados
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.scss']
})
export class FreelancerProfileComponent implements OnInit {
  currentUser: User | null = null;
  profileForm: FormGroup;
  skillsForm: FormGroup;
  portfolioForm: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  // Skills com níveis de proficiência
  skills: Habilidade[] = [];
  
  // Dados para a tabela de histórico de trabalhos
  workHistoryColumns: string[] = ['clientName', 'date', 'service', 'rating', 'amount', 'status', 'actions'];
  workHistoryData: HistoricoTrabalho[] = [];
  
  // Estatísticas do freelancer
  stats = {
    totalJobs: 0,
    completionRate: 0,
    averageRating: 0,
    totalEarnings: 0,
    responseRate: 0
  };

  availableCategories = [
    'Casa & Construção',
    'Serviços Profissionais',
    'Arte & Mídia',
    'Beleza & Bem-estar',
    'Eventos',
    'Outros'
  ];
  
  availableProfessions = [
    'Pintor',
    'Jardinagem',
    'Eletricista',
    'Encanador',
    'Carpinteiro',
    'Limpeza',
    'Decorador',
    'Pedreiro',
    'Marceneiro',
    'Programador',
    'Contador',
    'Tradutor',
    'Professor',
    'Músico',
    'Fotógrafo',
    'Designer',
    'Videomaker',
    'Cabeleireiro',
    'Maquiador',
    'Manicure',
    'Personal Trainer',
    'Massagista',
    'Chef',
    'Garçom',
    'DJ',
    'Organizador de Eventos',
    'Mecânico',
    'Motorista',
    'Veterinário',
    'Outro'
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      city: [''],
      biography: [''],
      hourlyRate: [0, [Validators.min(0)]],
      category: [''],
      profession: [''],
      experience: [''],
      availability: [''],
      workPreference: ['']
    });

    this.skillsForm = this.fb.group({
      skill: [''],
      level: [3]
    });
    
    this.portfolioForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['']
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserProfile(user);
        this.loadMockData();
      }
    });
  }

  loadUserProfile(user: User): void {
    // Em um cenário real, buscaríamos os dados completos do perfil do prestador
    // Para este exemplo, usamos os dados do usuário atual
    this.profileForm.patchValue({
      name: user.name,
      email: user.email,
      profession: 'Jardineiro',
      category: 'Casa & Construção',
      hourlyRate: 80,
      experience: '3-5',
      availability: 'Seg-Sex, 8h-18h',
      workPreference: 'Presencial'
    });

    // Simular dados de habilidades para este prestador
    this.skills = [
      { nome: 'Atendimento ao cliente', nivel: 5 },
      { nome: 'Qualidade de serviço', nivel: 4 }, 
      { nome: 'Pontualidade', nivel: 5 },
      { nome: 'Paisagismo', nivel: 4 },
      { nome: 'Poda', nivel: 5 },
      { nome: 'Manutenção', nivel: 3 }
    ];
  }
  
  loadMockData(): void {
    // Dados de exemplo para o histórico de trabalhos
    this.workHistoryData = [
      { 
        id: '1', 
        nomeCliente: 'Carlos Mendes', 
        data: new Date('2023-06-10'), 
        servico: 'Jardinagem Completa', 
        avaliacao: 5, 
        valor: 120, 
        status: 'concluido' 
      },
      { 
        id: '2', 
        nomeCliente: 'Ana Paula Silva', 
        data: new Date('2023-06-05'), 
        servico: 'Poda de Árvores', 
        avaliacao: 4, 
        valor: 80, 
        status: 'concluido' 
      },
      { 
        id: '3', 
        nomeCliente: 'Roberto Gomes', 
        data: new Date('2023-05-28'), 
        servico: 'Plantio de Gramado', 
        avaliacao: 5, 
        valor: 200, 
        status: 'concluido' 
      },
      { 
        id: '4', 
        nomeCliente: 'Fernanda Costa', 
        data: new Date('2023-05-15'), 
        servico: 'Manutenção Geral', 
        avaliacao: 5, 
        valor: 150, 
        status: 'concluido' 
      },
      { 
        id: '5', 
        nomeCliente: 'Paulo Henrique', 
        data: new Date('2023-06-15'), 
        servico: 'Projeto Paisagístico', 
        avaliacao: 0, 
        valor: 300, 
        status: 'em-andamento' 
      }
    ];
    
    // Calcular estatísticas
    const completedJobs = this.workHistoryData.filter(job => job.status === 'concluido');
    this.stats.totalJobs = this.workHistoryData.length;
    this.stats.completionRate = completedJobs.length / this.stats.totalJobs * 100;
    this.stats.averageRating = completedJobs.reduce((sum, job) => sum + job.avaliacao, 0) / completedJobs.length;
    this.stats.totalEarnings = this.workHistoryData.reduce((sum, job) => sum + job.valor, 0);
    this.stats.responseRate = 95; // valor fixo para exemplo
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const profileData = {
        ...this.profileForm.value,
        skills: this.skills
      };
      
      // Em um cenário real, enviaríamos esses dados para o servidor
      console.log('Salvando perfil:', profileData);
      
      // Atualizar o usuário localmente
      if (this.currentUser) {
        const updatedUser = {
          ...this.currentUser,
          name: profileData.name,
          email: profileData.email
        };
        
        this.authService.updateUserProfile(updatedUser);
        
        const notyf = new Notyf();
        notyf.success({
          message: 'Perfil atualizado com sucesso!',
          position: { x: 'right', y: 'top' }
        });
      }
    }
  }

  addSkill(): void {
    const skillName = this.skillsForm.get('skill')?.value?.trim();
    const skillLevel = this.skillsForm.get('level')?.value || 3;
    
    if (skillName && !this.skills.some(s => s.nome === skillName)) {
      this.skills.push({ nome: skillName, nivel: skillLevel });
      this.skillsForm.get('skill')?.reset();
      this.skillsForm.get('level')?.setValue(3);
    }
  }

  removeSkill(skillNome: string): void {
    const index = this.skills.findIndex(s => s.nome === skillNome);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      
      // Em um cenário real, faríamos upload desta imagem para o servidor
      console.log('Arquivo selecionado:', file.name);
      
      // Simulação de visualização da imagem
      const reader = new FileReader();
      reader.onload = () => {
        // Aqui poderíamos atualizar a imagem de perfil do usuário
        console.log('Imagem carregada:', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
  
  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
  
  addPortfolioItem(): void {
    if (this.portfolioForm.valid) {
      // Lógica para adicionar item ao portfólio
      console.log('Adicionando item ao portfólio:', this.portfolioForm.value);
      
      const notyf = new Notyf();
      notyf.success({
        message: 'Item adicionado ao portfólio!',
        position: { x: 'right', y: 'top' }
      });
      
      this.portfolioForm.reset();
    }
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'concluido': return 'status-completed';
      case 'em-progresso': return 'status-progress';
      case 'cancelado': return 'status-canceled';
      default: return '';
    }
  }
  
  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  // Propriedades Math e formatSliderLabel que faltavam
  Math = Math; // Tornando Math acessível no template
  
  // Formata o rótulo do slider
  formatSliderLabel(value: number): string {
    const labels = ['Iniciante', 'Básico', 'Intermediário', 'Avançado', 'Especialista'];
    return labels[value - 1] || '';
  }
}
