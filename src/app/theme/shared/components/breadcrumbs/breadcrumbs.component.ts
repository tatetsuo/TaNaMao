// Angular Import
import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, Event } from '@angular/router';
import { Title } from '@angular/platform-browser';

// project import
import {  NavigationItems } from 'src/app/theme/layout/admin/navigation/navigation';
import { NavigationItem } from 'src/app/theme/layout/admin/navigation/navigation-interface';
interface titleType {
  // eslint-disable-next-line
  url: string | boolean | any | undefined;
  title: string;
  breadcrumbs: unknown;
  type: string;
}

/* const routes: Routes = [
  { path: 'mapa', component: MapaComponent }
]; */

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbComponent {
  private route = inject(Router);
  private titleService = inject(Title);

  // public props
  @Input() type: string;

  navigations: NavigationItem[];
  breadcrumbList: string[] = [];
  navigationList!: titleType[];

  // constructor
  constructor() {
    this.navigations = [
      ...NavigationItems,
      {
        id: 'mapa',
        title: 'Mapa',
        type: 'item',
        url: '/mapa',
        icon: 'fas fa-map'
      },
      {
        id: 'wallet',
        title: 'Carteira',
        type: 'item',
        url: '/minha-carteira',
        icon: 'fas fa-wallet'
      },
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
    ];
    this.type = 'icon';
    this.setBreadcrumb();
  }

  // public method
  setBreadcrumb() {
    this.route.events.subscribe((router: Event) => {
      if (router instanceof NavigationEnd) {
        const activeLink = router.url;
        const breadcrumbList = this.filterNavigation(this.navigations, activeLink);
        this.navigationList = breadcrumbList.splice(-2);
        const title = breadcrumbList[breadcrumbList.length - 1]?.title || 'Bem Vindo';
        this.titleService.setTitle(title + ' | Tá Na Mão');
      }
    });
  }

  filterNavigation(navItems: NavigationItem[], activeLink: string): titleType[] {
    for (const navItem of navItems) {
      if (navItem.type === 'item' && 'url' in navItem && navItem.url === activeLink) {
        return [
          {
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          }
        ];
      }
      if ((navItem.type === 'group' || navItem.type === 'collapse') && 'children' in navItem) {
        const breadcrumbList = this.filterNavigation(navItem.children!, activeLink);

        if (breadcrumbList.length > 0) {
          breadcrumbList.unshift({
            url: 'url' in navItem ? navItem.url : false,
            title: navItem.title,
            breadcrumbs: 'breadcrumbs' in navItem ? navItem.breadcrumbs : true,
            type: navItem.type
          });
          return breadcrumbList;
        }
      }
    }
    return [];
  }
}
