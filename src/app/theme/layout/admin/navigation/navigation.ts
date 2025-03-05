export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
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
    id: 'catalogo',
    title: 'Catálogo de Serviços',
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
        url: '/catalogo/Programador',
        icon: 'fas fa-laptop-code'
      },
      {
        id: 'musico',
        title: 'Músico',
        type: 'item',
        url: '/catalogo/Musico',
        icon: 'fas fa-music'
      },
      {
        id: 'fotografo',
        title: 'Fotógrafo',
        type: 'item',
        url: '/catalogo/Fotografo',
        icon: 'fas fa-camera'
      },
      {
        id: 'construcao',
        title: 'Construção',
        type: 'item',
        url: '/catalogo/Construcao',
        icon: 'fa-solid fa-house-chimney-crack'
      },
      {
        id: 'vigilancia',
        title: 'Vigilância',
        type: 'item',
        url: '/catalogo/Vigilancia',
        icon: 'fa-solid fa-user'
      },
      {
        id: 'eletricista',
        title: 'Eletricista',
        type: 'item',
        url: '/catalogo/Eletricista',
        icon: 'fa-solid fa-bolt'
      },
      {
        id: 'encanador',
        title: 'Encanador',
        type: 'item',
        url: '/catalogo/Encanador',
        icon: 'fa-solid fa-droplet'
      },
      {
        id: 'carpinteiro',
        title: 'Carpinteiro',
        type: 'item',
        url: '/catalogo/Carpinteiro',
        icon: 'fa-solid fa-chair'
      },
      {
        id: 'portaria',
        title: 'Portaria',
        type: 'item',
        url: '/catalogo/Portaria',
        icon: 'fa-solid fa-building'
      },
      {
        id: 'limpeza',
        title: 'Limpeza',
        type: 'item',
        url: '/catalogo/limpeza',
        icon: 'fa-solid fa-broom'
      },
      // Novas categorias adicionadas
      {
        id: 'mecanico',
        title: 'Mecânico',
        type: 'item',
        url: '/catalogo/mecanico',
        icon: 'fa-solid fa-car-battery'
      },
      {
        id: 'chef',
        title: 'Chef',
        type: 'item',
        url: '/catalogo/chef',
        icon: 'fa-solid fa-utensils'
      },
      {
        id: 'maquiador',
        title: 'Maquiador',
        type: 'item',
        url: '/catalogo/maquiador',
        icon: 'fa-solid fa-spa'
      },
      {
        id: 'cabeleireiro',
        title: 'Cabeleireiro',
        type: 'item',
        url: '/catalogo/cabeleireiro',
        icon: 'fa-solid fa-scissors'
      },
      {
        id: 'motorista',
        title: 'Motorista',
        type: 'item',
        url: '/catalogo/motorista',
        icon: 'fa-solid fa-taxi'
      },
      {
        id: 'libras',
        title: 'Libras',
        type: 'item',
        url: '/catalogo/libras',
        icon: 'fa-solid fa-hands'
      },
      {
        id: 'contador',
        title: 'Contador',
        type: 'item',
        url: '/catalogo/contador',
        icon: 'fa-solid fa-calculator'
      },
      {
        id: 'alfaiate',
        title: 'Alfaiate',
        type: 'item',
        url: '/catalogo/alfaiate',
        icon: 'fa-solid fa-cut'
      },
      {
        id: 'tradutor',
        title: 'Tradutor',
        type: 'item',
        url: '/catalogo/tradutor',
        icon: 'fa-solid fa-language'
      },
      {
        id: 'decorador',
        title: 'Decorador',
        type: 'item',
        url: '/catalogo/decorador',
        icon: 'fa-solid fa-couch'
      },
      {
        id: 'professor',
        title: 'Professor',
        type: 'item',
        url: '/catalogo/professor',
        icon: 'fa-solid fa-chalkboard-teacher'
      },
      {
        id: 'veterinario',
        title: 'Veterinário',
        type: 'item',
        url: '/catalogo/veterinario',
        icon: 'fa-solid fa-paw'
      }
    ]
  }
];
