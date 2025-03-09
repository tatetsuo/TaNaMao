/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { FreelancerCarouselComponent } from '../../carrosel-freelance/carrosel.freelance.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    ChartDataMonthComponent,
    FreelancerCarouselComponent,
    CardComponent,
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '20dvh',
        overflow: 'hidden'
      })),
      state('expanded', style({
        maxHeight: '1000px'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
})
export class DefaultComponent implements OnInit {
  public ListGroup: any[] = [];
  isExpanded = false;
  username = '';

  serviceCategories = [
    // Casa & Construção
    {
      name: 'Pintor',
      icon: 'fas fa-paint-roller',
      routeParam: 'pintor',
      group: 'Casa & Construção'
    },
    {
      name: 'Jardinagem',
      icon: 'fa-solid fa-leaf',
      routeParam: 'jardinagem',
      group: 'Casa & Construção'
    },
    {
      name: 'Eletricista',
      icon: 'fa-solid fa-bolt',
      routeParam: 'Eletricista',
      group: 'Casa & Construção'
    },
    {
      name: 'Encanador',
      icon: 'fa-solid fa-droplet',
      routeParam: 'Encanador',
      group: 'Casa & Construção'
    },
    {
      name: 'Carpinteiro',
      icon: 'fa-solid fa-chair',
      routeParam: 'Carpinteiro',
      group: 'Casa & Construção'
    },
    {
      name: 'Limpeza',
      icon: 'fa-solid fa-broom',
      routeParam: 'limpeza',
      group: 'Casa & Construção'
    },
    {
      name: 'Decorador',
      icon: 'fa-solid fa-couch',
      routeParam: 'decorador',
      group: 'Casa & Construção'
    },
    {
      name: 'Pedreiro',
      icon: 'fa-solid fa-helmet-safety',
      routeParam: 'pedreiro',
      group: 'Casa & Construção'
    },
    {
      name: 'Marceneiro',
      icon: 'fa-solid fa-hammer',
      routeParam: 'marceneiro',
      group: 'Casa & Construção'
    },

    // Serviços Profissionais
    {
      name: 'Programador',
      icon: 'fas fa-laptop-code',
      routeParam: 'Programador',
      group: 'Serviços Profissionais'
    },
    {
      name: 'Contador',
      icon: 'fa-solid fa-calculator',
      routeParam: 'contador',
      group: 'Serviços Profissionais'
    },
    {
      name: 'Tradutor',
      icon: 'fa-solid fa-language',
      routeParam: 'tradutor',
      group: 'Serviços Profissionais'
    },
    {
      name: 'Professor',
      icon: 'fa-solid fa-chalkboard-teacher',
      routeParam: 'professor',
      group: 'Serviços Profissionais'
    },
    {
      name: 'Libras',
      icon: 'fa-solid fa-hands',
      routeParam: 'libras',
      group: 'Serviços Profissionais'
    },

    // Arte & Mídia
    {
      name: 'Músico',
      icon: 'fas fa-music',
      routeParam: 'Musico',
      group: 'Arte & Mídia'
    },
    {
      name: 'Fotógrafo',
      icon: 'fas fa-camera',
      routeParam: 'Fotografo',
      group: 'Arte & Mídia'
    },
    {
      name: 'Designer',
      icon: 'fa-solid fa-pen-nib',
      routeParam: 'designer',
      group: 'Arte & Mídia'
    },
    {
      name: 'Videomaker',
      icon: 'fa-solid fa-video',
      routeParam: 'videomaker',
      group: 'Arte & Mídia'
    },
    {
      name: 'Ilustrador',
      icon: 'fa-solid fa-paint-brush',
      routeParam: 'ilustrador',
      group: 'Arte & Mídia'
    },

    // Beleza & Bem-estar
    {
      name: 'Cabeleireiro',
      icon: 'fa-solid fa-scissors',
      routeParam: 'cabeleireiro',
      group: 'Beleza & Bem-estar'
    },
    {
      name: 'Maquiador',
      icon: 'fa-solid fa-spa',
      routeParam: 'maquiador',
      group: 'Beleza & Bem-estar'
    },
    {
      name: 'Manicure',
      icon: 'fa-solid fa-hand',
      routeParam: 'manicure',
      group: 'Beleza & Bem-estar'
    },
    {
      name: 'Personal Trainer',
      icon: 'fa-solid fa-dumbbell',
      routeParam: 'personal',
      group: 'Beleza & Bem-estar'
    },
    {
      name: 'Massagista',
      icon: 'fa-solid fa-hand-holding-medical',
      routeParam: 'massagista',
      group: 'Beleza & Bem-estar'
    },

    // Eventos
    {
      name: 'Chef',
      icon: 'fa-solid fa-utensils',
      routeParam: 'chef',
      group: 'Eventos'
    },
    {
      name: 'Garçom',
      icon: 'fa-solid fa-martini-glass',
      routeParam: 'garcom',
      group: 'Eventos'
    },
    {
      name: 'DJ',
      icon: 'fa-solid fa-headphones',
      routeParam: 'dj',
      group: 'Eventos'
    },
    {
      name: 'Organizador',
      icon: 'fa-solid fa-clipboard-list',
      routeParam: 'organizador',
      group: 'Eventos'
    },
    {
      name: 'Decorador de Festas',
      icon: 'fa-solid fa-birthday-cake',
      routeParam: 'decorador-festas',
      group: 'Eventos'
    },

    // Outros serviços (mantendo os existentes)
    {
      name: 'Construção',
      icon: 'fa-solid fa-house-chimney-crack',
      routeParam: 'Construcao',
      group: 'Casa & Construção'
    },
    {
      name: 'Vigilância',
      icon: 'fa-solid fa-user',
      routeParam: 'Vigilancia',
      group: 'Outros'
    },
    {
      name: 'Portaria',
      icon: 'fa-solid fa-building',
      routeParam: 'portaria',
      group: 'Outros'
    },
    {
      name: 'Mecânico',
      icon: 'fa-solid fa-car-battery',
      routeParam: 'mecanico',
      group: 'Outros'
    },
    {
      name: 'Alfaiate',
      icon: 'fa-solid fa-cut',
      routeParam: 'alfaiate',
      group: 'Outros'
    },
    {
      name: 'Motorista',
      icon: 'fa-solid fa-taxi',
      routeParam: 'motorista',
      group: 'Outros'
    },
    {
      name: 'Veterinário',
      icon: 'fa-solid fa-paw',
      routeParam: 'veterinario',
      group: 'Outros'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username') || 'Guest';
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  navigateToCategory(category: any) {
    this.router.navigate(['/catalogo', category.routeParam]);
  }
}