import { Injectable, signal, computed } from '@angular/core';
import { NavigationItem, createCollapseCategory } from './navigation-interface';
import { 
  CasaConstrucaoItems, 
  ServicosProfissionaisItems, 
  ArteMidiaItems,
  BelezaBemEstarItems,
  EventosItems,
  SaudeItems,
  EducacaoItems,
  OutrosServicosItems 
} from './navigation-categories';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  // Usando somente signal para o tipo de usuário
  private userTypeSignal = signal<'client' | 'freelancer' | 'guest'>('guest');
  
  // Computed signal para os itens de navegação
  public navigationItems = computed(() => {
    const userType = this.userTypeSignal();
    
    switch (userType) {
      case 'client':
        return this.getClientMenu();
      case 'freelancer':
        return this.getFreelancerMenu();
      default:
        return []; // Menu vazio para usuários não autenticados
    }
  });
  
  // Criando observable a partir do signal para compatibilidade
  public userType$ = toObservable(this.userTypeSignal);
  
  constructor() {
    // Inicializar tipo de usuário do localStorage se existir
    const storedType = localStorage.getItem('userType') as 'client' | 'freelancer' | 'guest' || 'guest';
    this.userTypeSignal.set(storedType);
  }
  
  // Método para obter os itens de navegação atuais
  get(): NavigationItem[] {
    return this.navigationItems();
  }
  
  // Método para definir o tipo de usuário
  setUserType(type: 'client' | 'freelancer' | 'guest'): void {
    localStorage.setItem('userType', type);
    this.userTypeSignal.set(type);
  }
  
  // Getter para o userType atual
  getUserType(): 'client' | 'freelancer' | 'guest' {
    return this.userTypeSignal();
  }
  
  // Menu para clientes (usuários normais)
  private getClientMenu(): NavigationItem[] {
    return [
      {
        id: 'client-dashboard',
        title: 'Dashboard',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'client-home',
            title: 'Início',
            type: 'item',
            url: '/default',
            icon: 'ti ti-home',
            breadcrumbs: false
          },
          {
            id: 'map',
            title: 'Mapa',
            type: 'item',
            url: '/mapa',
            icon: 'ti ti-map',
            breadcrumbs: true
          }
        ]
      },
      {
        id: 'client-services',
        title: 'Serviços',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          createCollapseCategory('casa-construcao', 'Casa & Construção', 'fa-solid fa-house', CasaConstrucaoItems),
          createCollapseCategory('servicos-profissionais', 'Serviços Profissionais', 'fa-solid fa-briefcase', ServicosProfissionaisItems),
          createCollapseCategory('arte-midia', 'Arte & Mídia', 'fa-solid fa-palette', ArteMidiaItems),
          createCollapseCategory('beleza', 'Beleza & Bem-estar', 'fa-solid fa-spa', BelezaBemEstarItems),
          createCollapseCategory('eventos', 'Eventos', 'fa-solid fa-calendar', EventosItems),
          createCollapseCategory('saude', 'Saúde', 'fa-solid fa-heartbeat', SaudeItems),
          createCollapseCategory('educacao', 'Educação', 'fa-solid fa-graduation-cap', EducacaoItems),
          createCollapseCategory('outros', 'Outros Serviços', 'fa-solid fa-ellipsis', OutrosServicosItems),
        ]
      },
      {
        id: 'client-services',
        title: 'Meus Serviços',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'client-my-services',
            title: 'Serviços Contratados',
            type: 'item',
            url: '/meus-servicos',
            icon: 'ti ti-checklist',
            breadcrumbs: false
          },
          {
            id: 'client-wallet',
            title: 'Minha Carteira',
            type: 'item',
            url: '/minha-carteira',
            icon: 'ti ti-wallet',
            breadcrumbs: false
          }
        ]
      }
    ];
  }
  
  // Menu para prestadores de serviço
  private getFreelancerMenu(): NavigationItem[] {
    return [
      {
        id: 'freelancer-dashboard',
        title: 'Dashboard',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'freelancer-overview',
            title: 'Visão Geral',
            type: 'item',
            url: '/prestador-dashboard',
            icon: 'ti ti-dashboard',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'freelancer-jobs',
        title: 'Meus Trabalhos',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'freelancer-jobs-management',
            title: 'Meus Trabalhos',
            type: 'collapse',
            icon: 'ti ti-briefcase',
            children: [
              {
                id: 'freelancer-jobs-active',
                title: 'Trabalhos Ativos',
                type: 'item',
                url: '/prestador-trabalhos/ativos',
                badge: {
                  title: '3',
                  type: 'warning'
                },
                breadcrumbs: false
              },
              {
                id: 'freelancer-jobs-completed',
                title: 'Concluídos',
                type: 'item',
                url: '/prestador-trabalhos/concluidos',
                breadcrumbs: false
              },
              {
                id: 'freelancer-jobs-calendar',
                title: 'Calendário',
                type: 'item',
                url: '/prestador-trabalhos/calendario',
                breadcrumbs: false
              }
            ]
          },
          {
            id: 'freelancer-earnings',
            title: 'Finanças',
            type: 'collapse',
            icon: 'ti ti-dollar-sign',
            children: [
              {
                id: 'freelancer-earnings-overview',
                title: 'Visão Geral',
                type: 'item',
                url: '/prestador-financas/visao-geral',
                breadcrumbs: false
              },
              {
                id: 'freelancer-earnings-wallet',
                title: 'Minha Carteira',
                type: 'item',
                url: '/prestador-financas/carteira',
                breadcrumbs: false
              },
              {
                id: 'freelancer-earnings-history',
                title: 'Histórico',
                type: 'item',
                url: '/prestador-financas/historico',
                breadcrumbs: false
              },
              {
                id: 'freelancer-earnings-invoice',
                title: 'Emitir Nota Fiscal',
                type: 'item',
                url: '/prestador-financas/nota-fiscal',
                breadcrumbs: false
              }
            ]
          }
        ]
      },
      {
        id: 'freelancer-tools-management',
        title: 'Ferramentas',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'freelancer-tools',
            title: 'Ferramentas',
            type: 'collapse',
            icon: 'ti ti-tools',
            children: [
              {
                id: 'freelancer-tools-portfolio',
                title: 'Gerenciar Portfólio',
                type: 'item',
                url: '/prestador-ferramentas/portfolio',
                breadcrumbs: false
              },
              {
                id: 'freelancer-tools-availability',
                title: 'Disponibilidade',
                type: 'item',
                url: '/prestador-ferramentas/disponibilidade',
                breadcrumbs: false
              },
              {
                id: 'freelancer-tools-prices',
                title: 'Tabela de Preços',
                type: 'item',
                url: '/prestador-ferramentas/precos',
                breadcrumbs: false
              },
              {
                id: 'freelancer-tools-services',
                title: 'Meus Serviços',
                type: 'item',
                url: '/prestador-ferramentas/servicos',
                breadcrumbs: false
              }
            ]
          },
          {
            id: 'freelancer-analytics',
            title: 'Analytics',
            type: 'collapse',
            icon: 'ti ti-chart-bar',
            children: [
              {
                id: 'freelancer-analytics-performance',
                title: 'Desempenho',
                type: 'item',
                url: '/prestador-analytics/desempenho',
                breadcrumbs: false
              },
              {
                id: 'freelancer-analytics-clients',
                title: 'Clientes',
                type: 'item',
                url: '/prestador-analytics/clientes',
                breadcrumbs: false
              },
              {
                id: 'freelancer-analytics-trends',
                title: 'Tendências',
                type: 'item',
                url: '/prestador-analytics/tendencias',
                breadcrumbs: false
              }
            ]
          }
        ]
      }
    ];
  }
}

// Exportando NavigationItems para compatibilidade
export const NavigationItems = [];
