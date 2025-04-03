export interface Badge {
  title?: string;
  type?: string;
}

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
  function?: () => void; // Tipado corretamente para evitar 'any'
  badge?: Badge;
  children?: NavigationItem[];
}

export function createCollapseCategory(id: string, title: string, icon: string, items: NavigationItem[]): NavigationItem {
  return {
    id,
    title,
    type: 'collapse',
    icon,
    children: items
  };
}
