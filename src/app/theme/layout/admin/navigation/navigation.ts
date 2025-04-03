import { Injectable } from '@angular/core';
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

@Injectable()
export class NavigationItemService {
  public items: NavigationItem[];

  constructor() {
    this.items = [
      {
        id: 'navigation',
        title: 'Navegação',
        type: 'group',
        icon: 'icon-navigation',
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/',
            icon: 'feather icon-home',
            classes: 'nav-item',
            breadcrumbs: false
          },
          {
            id: 'catalogo',
            title: 'Catálogo de Serviços',
            type: 'collapse',
            icon: 'feather icon-shopping-bag',
            children: [
              // Itens do catálogo
            ]
          },
          {
            id: 'wallet',
            title: 'Minha Carteira',
            type: 'item',
            url: '/minha-carteira',
            icon: 'feather icon-credit-card',
            classes: 'nav-item',
            breadcrumbs: false
          },
          {
            id: 'my-services',
            title: 'Meus Serviços',
            type: 'item',
            url: '/meus-servicos',
            icon: 'feather icon-briefcase',
            classes: 'nav-item',
            breadcrumbs: false
          }
        ]
      }
    ];
  }
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'fas fa-home',
    url: '/dashboard'
  },
  {
    id: 'mapa',
    title: 'Mapa',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'mapa',
        title: 'Mapa',
        type: 'item',
        classes: 'nav-item',
        url: '/mapa',
        icon: 'fas fa-map',
        breadcrumbs: true
      }
    ]
  },
  {
    id: 'catalogo',
    title: 'Catálogo de Serviços',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      createCollapseCategory('casa-construcao', 'Casa', 'fa-solid fa-house', CasaConstrucaoItems),
      createCollapseCategory('servicos-profissionais', 'Serviços Profissionais', 'fa-solid fa-briefcase', ServicosProfissionaisItems),
      createCollapseCategory('arte-midia', 'Arte & Mídia', 'fa-solid fa-palette', ArteMidiaItems),
      createCollapseCategory('beleza-bem-estar', 'Beleza', 'fa-solid fa-spa', BelezaBemEstarItems),
      createCollapseCategory('eventos', 'Eventos', 'fa-solid fa-calendar', EventosItems),
      createCollapseCategory('saude', 'Saúde', 'fa-solid fa-heartbeat', SaudeItems),
      createCollapseCategory('educacao', 'Educação', 'fa-solid fa-graduation-cap', EducacaoItems),
      createCollapseCategory('outros', 'Outros Serviços', 'fa-solid fa-ellipsis', OutrosServicosItems),
    ]
  }
];
