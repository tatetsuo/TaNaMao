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
    {
      name: 'Pintor',
      icon: 'fas fa-paint-roller',
      routeParam: 'pintor'
    },
    {
      name: 'Jardinagem',
      icon: 'fa-solid fa-leaf',
      routeParam: 'jardinagem'
    },
    {
      name: 'Programador',
      icon: 'fas fa-laptop-code',
      routeParam: 'Programador'
    },
    {
      name: 'Musico',
      icon: 'fas fa-music',
      routeParam: 'Musico'
    },
    {
      name: 'Fotógrafo',
      icon: 'fas fa-camera',
      routeParam: 'Fotografo'
    },
    {
      name: 'Construção',
      icon: 'fa-solid fa-house-chimney-crack',
      routeParam: 'Construcao'
    },
    {
      name: 'Vigilância',
      icon: 'fa-solid fa-user',
      routeParam: 'Vigilancia'
    },
    {
      name: 'Eletricista',
      icon: 'fa-solid fa-bolt',
      routeParam: 'Eletricista'
    },
    {
      name: 'Encanador',
      icon: 'fa-solid fa-droplet',
      routeParam: 'Encanador'
    },
    {
      name: 'Carpinteiro',
      icon: 'fa-solid fa-chair',
      routeParam: 'Carpinteiro'
    },
    {
      name: 'Prortaria',
      icon: 'fa-solid fa-building',
      routeParam: 'Limpeza'
    },
    {
      name: 'Limpeza',
      icon: 'fa-solid fa-broom',
      routeParam: 'limpeza'
    },
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