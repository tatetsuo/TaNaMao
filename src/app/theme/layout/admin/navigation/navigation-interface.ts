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

// Função auxiliar para criar categorias colapsáveis
export function createCollapseCategory(id: string, title: string, icon: string, children: NavigationItem[]): NavigationItem {
  return {
    id,
    title,
    type: 'collapse',
    icon,
    children
  };
}
