import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, output, ChangeDetectorRef, NgZone, ApplicationRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class NavigationComponent implements OnInit, OnDestroy {
  // public props
  isSideBarOpen = output();
  NavCollapsedMob = output();
  SubmenuCollapse = output();
  navCollapsedMob = false;
  windowWidth = window.innerWidth;
  themeMode!: string;
  navigationItems: NavigationItem[] = [];
  
  // Subscription para gerenciar as inscrições
  private subscriptions = new Subscription();

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private appRef: ApplicationRef
  ) {
    // Inicializa com valores padrão sem forçar detecção de mudanças
    this.navigationItems = this.navigationService.get();
  }

  ngOnInit(): void {
    // Observar mudanças no tipo de usuário
    const userTypeSubscription = this.navigationService.userType$.subscribe(() => {
      this.ngZone.run(() => {
        // Atualiza os items de navegação quando o tipo de usuário mudar
        this.navigationItems = this.navigationService.get();
        
        // Adiciona classe temporária para efeito visual da atualização
        const navElement = document.querySelector('app-navigation');
        if (navElement) {
          navElement.classList.add('menu-updated');
          setTimeout(() => {
            navElement.classList.remove('menu-updated');
          }, 300);
        }
        
        // Força a detecção de mudanças
        this.cdr.detectChanges();
        this.appRef.tick();
      });
    });
    this.subscriptions.add(userTypeSubscription);

    // Verificar o tipo de usuário no localStorage ao iniciar
    const storedUserType = localStorage.getItem('userType') as 'client' | 'freelancer' | 'guest';
    if (storedUserType) {
      this.navigationService.setUserType(storedUserType);
    } else if (this.authService.isLoggedIn()) {
      // Se não houver tipo armazenado mas o usuário estiver logado
      this.navigationService.setUserType(this.authService.isFreelancer() ? 'freelancer' : 'client');
    }
  }

  ngOnDestroy(): void {
    // Cancelar todas as inscrições ao destruir o componente
    this.subscriptions.unsubscribe();
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
