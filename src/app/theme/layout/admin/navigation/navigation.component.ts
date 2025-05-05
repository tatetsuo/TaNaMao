import { CommonModule } from '@angular/common';
import { Component, OnInit, output, inject, effect } from '@angular/core';
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
  
  // Injeções simplificadas com inject
  private navigationService = inject(NavigationService);
  private authService = inject(AuthService);
  
  // Usar computed property do serviço diretamente
  get navigationItems(): NavigationItem[] {
    return this.navigationService.navigationItems();
  }

  constructor() {
    // Observer para aplicar animação quando houver mudanças no menu
    effect(() => {
      // Acessar o valor do signal para reagir a mudanças
      const items = this.navigationService.navigationItems();
      
      // Aplicar efeito visual apenas quando itens forem atualizados (não na inicialização)
      if (items.length > 0) {
        // Adiciona classe temporária para efeito visual da atualização
        const navElement = document.querySelector('app-navigation');
        if (navElement) {
          navElement.classList.add('menu-updated');
          setTimeout(() => {
            navElement.classList.remove('menu-updated');
          }, 300);
        }
      }
    });
  }

  ngOnInit(): void {
    // Verificar o tipo de usuário no localStorage ao iniciar
    const storedUserType = localStorage.getItem('userType') as 'client' | 'freelancer' | 'guest';
    if (storedUserType) {
      this.navigationService.setUserType(storedUserType);
    } else if (this.authService.isLoggedIn()) {
      // Se não houver tipo armazenado mas o usuário estiver logado
      this.navigationService.setUserType(this.authService.isFreelancer() ? 'freelancer' : 'client');
    }
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
