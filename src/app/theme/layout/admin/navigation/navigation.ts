import { Injectable } from '@angular/core';
import { NavigationItem } from './navigation-interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  public get(): NavigationItem[] {
    return NavigationItems;
  }
}

// Menu de navegação principal
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Menu',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'home',
        title: 'Dashboard',
        type: 'item',
        url: '/default',
        icon: 'ti ti-home',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'client-services',
    title: 'Serviços',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'client-catalogs',
        title: 'Categorias',
        type: 'collapse',
        icon: 'ti ti-list-check',
        children: [
          {
            id: 'client-catalogs-construction',
            title: 'Casa & Construção',
            type: 'item',
            url: '/catalogo/construcao',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'client-catalogs-pro',
            title: 'Serviços Profissionais',
            type: 'item',
            url: '/catalogo/profissionais',
            target: false,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'client-map',
        title: 'Mapa',
        type: 'item',
        url: '/mapa',
        icon: 'ti ti-map',
        breadcrumbs: false
      },
      {
        id: 'client-my-services',
        title: 'Meus Serviços',
        type: 'item',
        url: '/meus-servicos',
        icon: 'ti ti-checklist',
        breadcrumbs: false
      },
      {
        id: 'client-wallet',
        title: 'Carteira',
        type: 'item',
        url: '/minha-carteira',
        icon: 'ti ti-wallet',
        breadcrumbs: false
      }
    ]
  },
  // Menu específico para prestadores de serviço
  {
    id: 'freelancer-menu',
    title: 'Área do Prestador',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'freelancer-dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/prestador-dashboard',
        icon: 'ti ti-dashboard',
        classes: 'nav-item',
        breadcrumbs: false
      },
      {
        id: 'freelancer-profile',
        title: 'Meu Perfil',
        type: 'item',
        url: '/prestador-perfil',
        icon: 'ti ti-user',
        classes: 'nav-item',
        breadcrumbs: false
      },
      // Novos itens de menu para prestadores
      {
        id: 'freelancer-jobs',
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
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-jobs-completed',
            title: 'Concluídos',
            type: 'item',
            url: '/prestador-trabalhos/concluidos',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-jobs-calendar',
            title: 'Calendário',
            type: 'item',
            url: '/prestador-trabalhos/calendario',
            target: false,
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
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-earnings-wallet',
            title: 'Minha Carteira',
            type: 'item',
            url: '/prestador-financas/carteira',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-earnings-history',
            title: 'Histórico',
            type: 'item',
            url: '/prestador-financas/historico',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-earnings-invoice',
            title: 'Emitir Nota Fiscal',
            type: 'item',
            url: '/prestador-financas/nota-fiscal',
            target: false,
            breadcrumbs: false
          }
        ]
      },
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
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-tools-availability',
            title: 'Disponibilidade',
            type: 'item',
            url: '/prestador-ferramentas/disponibilidade',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-tools-prices',
            title: 'Tabela de Preços',
            type: 'item',
            url: '/prestador-ferramentas/precos',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-tools-services',
            title: 'Meus Serviços',
            type: 'item',
            url: '/prestador-ferramentas/servicos',
            target: false,
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
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-analytics-clients',
            title: 'Clientes',
            type: 'item',
            url: '/prestador-analytics/clientes',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'freelancer-analytics-trends',
            title: 'Tendências',
            type: 'item',
            url: '/prestador-analytics/tendencias',
            target: false,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'freelancer-reviews',
        title: 'Avaliações',
        type: 'item',
        url: '/prestador-avaliacoes',
        icon: 'ti ti-star',
        classes: 'nav-item',
        breadcrumbs: false
      },
      {
        id: 'freelancer-settings',
        title: 'Configurações',
        type: 'item',
        url: '/prestador-configuracoes',
        icon: 'ti ti-settings',
        classes: 'nav-item',
        breadcrumbs: false
      }
    ]
  }
];
