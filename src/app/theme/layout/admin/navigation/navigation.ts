export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'mapa',
    title: 'Mapa',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Mapa',
        type: 'item',
        classes: 'nav-item',
        url: '/mapa',
        icon: 'fas fa-map',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'categorias',
    title: 'Categorias',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'pintor',
        title: 'Pintor',
        type: 'item',
        url: '/catalogo/pintor',
        icon: 'fas fa-paint-roller'
      },
      {
        id: 'jardinagem',
        title: 'Jardinagem',
        type: 'item',
        url: '/catalogo/jardinagem',
        icon: 'fa-solid fa-leaf'
      },
      {
        id: 'programador',
        title: 'Programador',
        type: 'item',
        url: '/catalogo/programming',
        icon: 'fas fa-laptop-code'
      },
      {
        id: 'musico',
        title: 'Musico',
        type: 'item',
        url: '/catalogo/music',
        icon: 'fas fa-music'
      },
      {
        id: 'fotografo',
        title: 'Fotógrafo',
        type: 'item',
        url: '/catalogo/photography',
        icon: 'fas fa-camera'
      },
      {
        id: 'construcao',
        title: 'Construção',
        type: 'item',
        url: '/catalogo/construcao',
        icon: 'fa-solid fa-house-chimney-crack'
      },
      {
        id: 'vigilancia',
        title: 'Vigilância',
        type: 'item',
        url: '/catalogo/vigia',
        icon: 'fa-solid fa-user'
      },
      {
        id: 'eletricista',
        title: 'Eletricista',
        type: 'item',
        url: '/catalogo/eletricista',
        icon: 'fa-solid fa-bolt'
      },
      {
        id: 'encanador',
        title: 'Encanador',
        type: 'item',
        url: '/catalogo/encanador',
        icon: 'fa-solid fa-droplet'
      },
      {
        id: 'carpinteiro',
        title: 'Carpinteiro',
        type: 'item',
        url: '/catalogo/carpinteiro',
        icon: 'fa-solid fa-chair'
      },
      {
        id: 'portaria',
        title: 'Portaria',
        type: 'item',
        url: '/catalogo/portaria',
        icon: 'fa-solid fa-building'
      },
      {
        id: 'limpeza',
        title: 'Limpeza',
        type: 'item',
        url: '/catalogo/limpeza',
        icon: 'fa-solid fa-broom'
      }
    ]
  }
];
