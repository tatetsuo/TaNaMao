import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

interface Service {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  totalReviews: number;
  freelancerName: string;
  profileImage: string;
  tags: string[];
  deliveryTime: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule
  ],
  templateUrl: './catalogo-servicos.component.html',
  styleUrls: ['./catalogo-servicos.component.scss']
})
export class ServicesComponent implements OnInit {
  selectedCategory = 'Graphic Design';

  services: Service[] = [
    {
      id: 1,
      title: 'Professional Logo Design with Unique Branding',
      category: 'Graphic Design',
      price: 150.00,
      rating: 4.8,
      totalReviews: 45,
      freelancerName: 'Maria Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      tags: ['Logo', 'Branding', 'Business'],
      deliveryTime: 3
    },
    {
      id: 2,
      title: 'Creative Illustration and Character Design',
      category: 'Graphic Design',
      price: 250.00,
      rating: 4.9,
      totalReviews: 62,
      freelancerName: 'João Santos',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      tags: ['Illustration', 'Character', 'Digital Art'],
      deliveryTime: 5
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Extrai o parâmetro 'category' da rota e atualiza a propriedade
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.selectedCategory = category;
      }
    });
  }
}
