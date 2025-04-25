import { Component, OnInit, OnDestroy, output, inject, signal, computed } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

// theme version
import { environment } from 'src/environments/environment';

// project import
import { NavigationItem } from '../navigation-interface';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavigationService } from '../navigation';

// NgScrollbarModule
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule, RouterModule, NavCollapseComponent, NavGroupComponent, NavItemComponent, SharedModule],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss'
})
export class NavContentComponent implements OnInit, OnDestroy {
  private location = inject(Location);
  private navigationService = inject(NavigationService);

  // public props
  NavCollapsedMob = output();
  SubmenuCollapse = output();

  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;

  // Sinal para os itens de navegação
  private navigationSignal = signal<NavigationItem[]>([]);
  navigations = computed(() => this.navigationSignal());
  
  windowWidth: number;
  
  private subscriptions = new Subscription();

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.updateNavigationItems();
  }
  
  // Atualizar itens de navegação
  private updateNavigationItems(): void {
    const navItems = this.navigationService.get();
    this.navigationSignal.set(navItems);
  }

  // Life cycle events
  ngOnInit() {
    if (this.windowWidth < 1025) {
      setTimeout(() => {
        (document.querySelector('.coded-navbar') as HTMLDivElement)?.classList.add('menupos-static');
      }, 500);
    }
    
    // Observar mudanças no tipo de usuário
    const subscription = this.navigationService.userType$.subscribe(() => {
      this.updateNavigationItems();
    });
    this.subscriptions.add(subscription);
  }
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  fireOutClick() {
    let current_url = this.location.path();
    // eslint-disable-next-line
    // @ts-ignore
    if (this.location['_baseHref']) {
      // eslint-disable-next-line
      // @ts-ignore
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }
}
