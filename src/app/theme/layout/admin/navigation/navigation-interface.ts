export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  hidden?: boolean; 
}

export function createCollapseCategory(id: string, title: string, icon: string, children: NavigationItem[]): NavigationItem {
  return {
    id,
    title,
    type: 'collapse',
    icon,
    children
  };
}
