// Angular import
import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

// project import
import { BerryConfig } from 'src/app/app-config';

import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavLogoComponent } from './nav-logo/nav-logo.component';
import { NavRightComponent } from './nav-right/nav-right.component';

export interface Category {
  name: string;
  icon: string;
  routeParam: string;
}

export interface CategoryGroup {
  name: string;
  icon: string;
  categories: Category[];
  isExpanded?: boolean;
}

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavLogoComponent, NavLeftComponent, NavRightComponent, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  // public props
  NavCollapse = output();
  NavCollapsedMob = output();
  navCollapsed: boolean;
  windowWidth: number;
  navCollapsedMob: boolean;
  
  // Categorias agrupadas para o menu lateral
  categoryGroups: CategoryGroup[] = [
    {
      name: 'Casa & Construção',
      icon: 'fa-solid fa-house',
      isExpanded: false,
      categories: [
        { name: 'Pintor', icon: 'fas fa-paint-roller', routeParam: 'pintor' },
        { name: 'Jardinagem', icon: 'fa-solid fa-leaf', routeParam: 'jardinagem' },
        { name: 'Eletricista', icon: 'fa-solid fa-bolt', routeParam: 'Eletricista' },
        { name: 'Encanador', icon: 'fa-solid fa-droplet', routeParam: 'Encanador' },
        { name: 'Carpinteiro', icon: 'fa-solid fa-chair', routeParam: 'Carpinteiro' },
        { name: 'Limpeza', icon: 'fa-solid fa-broom', routeParam: 'limpeza' },
        { name: 'Decorador', icon: 'fa-solid fa-couch', routeParam: 'decorador' }
      ]
    },
    {
      name: 'Serviços Profissionais',
      icon: 'fa-solid fa-briefcase',
      isExpanded: false,
      categories: [
        { name: 'Programador', icon: 'fas fa-laptop-code', routeParam: 'Programador' },
        { name: 'Contador', icon: 'fa-solid fa-calculator', routeParam: 'contador' },
        { name: 'Tradutor', icon: 'fa-solid fa-language', routeParam: 'tradutor' },
        { name: 'Professor', icon: 'fa-solid fa-chalkboard-teacher', routeParam: 'professor' },
        { name: 'Advogado', icon: 'fa-solid fa-scale-balanced', routeParam: 'advogado' }
      ]
    },
    {
      name: 'Arte & Mídia',
      icon: 'fa-solid fa-palette',
      isExpanded: false,
      categories: [
        { name: 'Músico', icon: 'fas fa-music', routeParam: 'Musico' },
        { name: 'Fotógrafo', icon: 'fas fa-camera', routeParam: 'Fotografo' },
        { name: 'Designer', icon: 'fa-solid fa-pen-nib', routeParam: 'designer' },
        { name: 'Videomaker', icon: 'fa-solid fa-video', routeParam: 'videomaker' }
      ]
    },
    {
      name: 'Beleza & Bem-estar',
      icon: 'fa-solid fa-spa',
      isExpanded: false,
      categories: [
        { name: 'Cabeleireiro', icon: 'fa-solid fa-scissors', routeParam: 'cabeleireiro' },
        { name: 'Maquiador', icon: 'fa-solid fa-spa', routeParam: 'maquiador' },
        { name: 'Manicure', icon: 'fa-solid fa-hand', routeParam: 'manicure' },
        { name: 'Personal Trainer', icon: 'fa-solid fa-dumbbell', routeParam: 'personal' }
      ]
    },
    {
      name: 'Eventos',
      icon: 'fa-solid fa-calendar',
      isExpanded: false,
      categories: [
        { name: 'Chef', icon: 'fa-solid fa-utensils', routeParam: 'chef' },
        { name: 'Garçom', icon: 'fa-solid fa-martini-glass', routeParam: 'garcom' },
        { name: 'DJ', icon: 'fa-solid fa-headphones', routeParam: 'dj' },
        { name: 'Organizador', icon: 'fa-solid fa-clipboard-list', routeParam: 'organizador' }
      ]
    }
  ];

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsed = this.windowWidth >= 1025 ? BerryConfig.isCollapse_menu : false;
    this.navCollapsedMob = false;
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
  
  // Método para expandir/colapsar grupos de categorias
  toggleGroupExpand(group: CategoryGroup) {
    group.isExpanded = !group.isExpanded;
  }
}
