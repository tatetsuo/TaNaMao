// Angular import
import { CommonModule } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavContentComponent } from './nav-content/nav-content.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigationService } from './navigation';
import { NavigationItem } from './navigation-interface';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavContentComponent, CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  // public props
  isSideBarOpen = output();
  NavCollapsedMob = output();
  SubmenuCollapse = output();
  navCollapsedMob = false;
  windowWidth = window.innerWidth;
  themeMode!: string;
  navigationItems: NavigationItem[] = [];

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService
  ) {
    this.navigationItems = this.navigationService.get();
  }

  ngOnInit(): void {
    // Filtrar itens de menu com base no tipo de usuário
    this.authService.currentUser.subscribe(user => {
      if (user) {
        const allItems = this.navigationService.get();
        
        if (user.isFreelancer) {
          // Para prestadores, mostra apenas itens padrão e itens de prestador
          this.navigationItems = allItems.filter((item) => 
            !item.id.includes('client-') || item.id === 'home' || item.id.includes('freelancer-'));
        } else {
          // Para clientes, mostra apenas itens padrão e itens de cliente
          this.navigationItems = allItems.filter((item) => 
            !item.id.includes('freelancer-'));
        }
      } else {
        // Se não estiver logado, mostrar apenas o menu básico
        this.navigationItems = this.navigationService.get().filter((item) => 
          item.id === 'navigation');
      }
    });
  }

  // public method
  navCollapseMob(): void {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  navSubmenuCollapse(): void {
    document.querySelector('app-navigation.coded-navbar')?.classList.add('coded-trigger');
  }
}
