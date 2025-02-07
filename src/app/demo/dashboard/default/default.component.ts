/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BajajChartComponent } from 'src/app/theme/shared/components/apexchart/bajaj-chart/bajaj-chart.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

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
    BajajChartComponent,
    BarChartComponent,
    ChartDataMonthComponent,
    CardComponent
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  public ListGroup: any[] = [];
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
      routeParam: 'programming'
    },
    {
      name: 'Musico',
      icon: 'fas fa-music',
      routeParam: 'music'
    },
    {
      name: 'Fotógrafo',
      icon: 'fas fa-camera',
      routeParam: 'photography'
    },
    {
      name: 'Construção',
      icon: 'fa-solid fa-house-chimney-crack',
      routeParam: 'construcao'
    },
    {
      name: 'Vigilância',
      icon: 'fa-solid fa-user', 
      routeParam: 'vigia'
    },
    {
      name: 'Eletricista',
      icon: 'fa-solid fa-bolt', 
      routeParam: 'eletricista'
    },
    {
      name: 'Encanador',
      icon: 'fa-solid fa-droplet',
      routeParam: 'encanador'
    },
    {
      name: 'Carpinteiro',
      icon: 'fa-solid fa-chair', 
      routeParam: 'carpinteiro'
    },
    {
      name: 'Prortaria',
      icon: 'fa-solid fa-building', 
      routeParam: 'portaria'
    },
    {
      name: 'Limpeza',
      icon: 'ti ti-broom', 
      routeParam: 'limpeza'
    }, 
  ];
}