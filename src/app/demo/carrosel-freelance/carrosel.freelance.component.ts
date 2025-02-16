import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ServiceDetailsComponent } from '../catalogo-servicos/service-details/service-details.component';

interface FreelancerProfile {
  id: number;
  name: string;
  title: string;
  rating: number;
  hourlyRate: number;
  originalRate?: number;
  description: string;
  skills: string[];
  imageUrl: string;
  completedProjects: number;
  category: string;
  discount?: number;
  totalReviews?: number;
  tags: string[];
  deliveryTime?: number;
  level?: string;
}

@Component({
  selector: 'app-freelancer-carousel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBadgeModule,
    MatDialogModule
  ],
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.scss']
})
export class FreelancerCarouselComponent {
  currentIndex = 0;
  visibleSlides = 3;

  freelancers: FreelancerProfile[] = [
    {
      id: 1,
      name: 'Ana Silva',
      title: 'Desenvolvedora Full Stack',
      rating: 4.8,
      hourlyRate: 120,
      originalRate: 150,
      description: 'Especialista em desenvolvimento web com 5 anos de experiência em React, Angular e Node.js.',
      skills: ['Angular', 'React', 'Node.js', 'TypeScript'],
      imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
      completedProjects: 47,
      category: 'Desenvolvimento',
      discount: 20,
      tags: ['Angular', 'React', 'Node.js', 'TypeScript']
    },
    {
      id: 2,
      name: 'Pedro Santos',
      title: 'Designer UI/UX',
      rating: 4.9,
      hourlyRate: 120,
      description: 'Designer apaixonado por criar interfaces intuitivas e experiências de usuário memoráveis.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      imageUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
      completedProjects: 38,
      category: 'Design',
      tags: ['Figma', 'Adobe XD', 'Prototyping', 'User Research']
    },
    {
      id: 3,
      name: 'Mariana Costa',
      title: 'Marketing Digital',
      rating: 4.7,
      hourlyRate: 80,
      originalRate: 100,
      description: 'Estrategista de marketing digital com foco em crescimento e conversão.',
      skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics'],
      imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
      completedProjects: 52,
      category: 'Marketing',
      discount: 20,
      tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics']
    },
    {
      id: 4,
      name: 'Lucas Oliveira',
      title: 'Desenvolvedor Mobile',
      rating: 4.9,
      hourlyRate: 140,
      description: 'Desenvolvedor mobile especializado em aplicativos iOS e Android nativos.',
      skills: ['Swift', 'Kotlin', 'Flutter', 'React Native'],
      imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
      completedProjects: 31,
      category: 'Mobile',
      tags: ['Swift', 'Kotlin', 'Flutter', 'React Native']
    },
    {
      id: 5,
      name: 'Carolina Lima',
      title: 'Copywriter',
      rating: 4.8,
      hourlyRate: 90,
      description: 'Copywriter criativa especializada em conteúdo persuasivo e storytelling.',
      skills: ['Copywriting', 'SEO Writing', 'Email Marketing', 'Brand Voice'],
      imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
      completedProjects: 64,
      category: 'Conteúdo',
      tags: ['Copywriting', 'SEO Writing', 'Email Marketing', 'Brand Voice']
    },
    {
      id: 6,
      name: 'Rafael Mendes',
      title: 'Data Scientist',
      rating: 4.9,
      hourlyRate: 160,
      description: 'Cientista de dados com experiência em machine learning e análise preditiva.',
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
      completedProjects: 28,
      category: 'Dados',
      tags: ['Python', 'Machine Learning', 'SQL', 'Data Visualization']
    }
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {
    this.updateVisibleSlides();
    window.addEventListener('resize', () => {
      this.updateVisibleSlides();
    });
  }

  updateVisibleSlides() {
    if (window.innerWidth <= 768) {
      this.visibleSlides = 1;
    } else if (window.innerWidth <= 1200) {
      this.visibleSlides = 2;
    } else {
      this.visibleSlides = 3;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.freelancers.length - this.visibleSlides) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  viewProfile(profile: FreelancerProfile) {
    const serviceData = {
      id: profile.id.toString(),
      title: profile.title,
      profileImage: profile.imageUrl,
      freelancerName: profile.name,
      category: profile.category,
      price: profile.hourlyRate,
      rating: profile.rating,
      totalReviews: profile.completedProjects,
      description: profile.description,
      deliveryTime: profile.deliveryTime || 1,
      level: profile.level || 'Intermediário',
      tags: profile.skills
    };

    this.dialog.open(ServiceDetailsComponent, {
      data: serviceData,
      width: '800px'
    });
  }

  hireFreelancer(profile: FreelancerProfile) {
    const serviceData = {
      id: profile.id.toString(),
      title: profile.title,
      profileImage: profile.imageUrl,
      freelancerName: profile.name,
      category: profile.category,
      price: profile.hourlyRate,
      rating: profile.rating,
      totalReviews: profile.completedProjects,
      description: profile.description,
      deliveryTime: profile.deliveryTime || 1,
      level: profile.level || 'Intermediário',
      tags: profile.skills
    };

    this.router.navigate(['/contrato', profile.id], {
      state: { serviceData }
    });
  }
}