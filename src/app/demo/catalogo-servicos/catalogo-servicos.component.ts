import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { MatExpansionModule } from '@angular/material/expansion';

interface Service {
  id: number;
  title: string;
  category: string;
  subCategory?: string;
  price: number;
  rating: number;
  totalReviews: number;
  freelancerName: string;
  profileImage: string;
  tags: string[];
  deliveryTime: number;
  description: string;
  level: 'Iniciante' | 'Intermediário' | 'Expert';
}

interface Filter {
  name: string;
  options: string[];
}

@Component({
  selector: 'app-freelancer-catalog',
  templateUrl: './catalogo-servicos.component.html',
  styleUrls: ['./catalogo-servicos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    MatSelectModule,
    CardComponent
  ]
})
export class ServicesComponent implements OnInit {
  selectedCategory = '';
  searchQuery = '';
  minPrice?: number;
  maxPrice?: number;
  selectedFilters: Record<string, string[]> = {};

  filters: Filter[] = [
    {
      name: 'Nível',
      options: ['Iniciante', 'Intermediário', 'Expert']
    },
    {
      name: 'Tempo de Entrega',
      options: ['Até 24h', '1-3 dias', '3-7 dias', '7+ dias']
    },
    {
      name: 'Avaliação',
      options: ['4.5+', '4.0+', '3.5+']
    }
  ];

  services: Service[] = [
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 1,
      title: 'Pintura Residencial Profissional',
      category: 'Pintor',
      price: 200,
      rating: 4.8,
      totalReviews: 127,
      freelancerName: 'João Silva',
      profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      deliveryTime: 3,
      description: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      level: 'Expert'
    },
    {
      id: 2,
      title: 'Manutenção de Jardins',
      category: 'Jardinagem',
      price: 150,
      rating: 4.7,
      totalReviews: 89,
      freelancerName: 'Maria Oliveira',
      profileImage: 'https://randomuser.me/api/portraits/women/71.jpg',
      tags: ['Jardim', 'Paisagismo', 'Manutenção'],
      deliveryTime: 1,
      description: 'Cuidados completos com seu jardim, incluindo poda, plantio e manutenção.',
      level: 'Expert'
    },
    {
      id: 3,
      title: 'Desenvolvimento Web Full Stack',
      category: 'Programador',
      price: 300,
      rating: 4.9,
      totalReviews: 156,
      freelancerName: 'Pedro Santos',
      profileImage: 'https://randomuser.me/api/portraits/women/41.jpg',
      tags: ['React', 'Node.js', 'Full Stack'],
      deliveryTime: 5,
      description: 'Desenvolvimento de aplicações web completas com as tecnologias mais modernas.',
      level: 'Expert'
    },
    {
      id: 4,
      title: 'Shows e Eventos',
      category: 'Musico',
      price: 500,
      rating: 4.8,
      totalReviews: 92,
      freelancerName: 'Ana Costa',
      profileImage: 'https://randomuser.me/api/portraits/women/31.jpg',
      tags: ['Música ao Vivo', 'Eventos', 'Casamentos'],
      deliveryTime: 1,
      description: 'Apresentações musicais para eventos, festas e casamentos.',
      level: 'Expert'
    },
    {
      id: 5,
      title: 'Fotografia de Eventos',
      category: 'Fotografo',
      price: 400,
      rating: 4.6,
      totalReviews: 113,
      freelancerName: 'Lucas Mendes',
      profileImage: 'https://randomuser.me/api/portraits/women/21.jpg',
      tags: ['Eventos', 'Fotografia', 'Edição'],
      deliveryTime: 2,
      description: 'Cobertura fotográfica profissional para eventos e ocasiões especiais.',
      level: 'Expert'
    },
    {
      id: 6,
      title: 'Reformas e Construções',
      category: 'Construcao',
      price: 1000,
      rating: 4.7,
      totalReviews: 78,
      freelancerName: 'Antonio Pereira',
      profileImage: 'https://randomuser.me/api/portraits/women/51.jpg',
      tags: ['Reforma', 'Construção', 'Acabamento'],
      deliveryTime: 7,
      description: 'Serviços completos de reforma e construção residencial.',
      level: 'Expert'
    },
    {
      id: 7,
      title: 'Segurança Patrimonial',
      category: 'Vigilancia',
      price: 180,
      rating: 4.5,
      totalReviews: 64,
      freelancerName: 'Carlos Souza',
      profileImage: 'https://randomuser.me/api/portraits/women/81.jpg',
      tags: ['Segurança', 'Vigilância', 'Patrimonial'],
      deliveryTime: 1,
      description: 'Serviços de vigilância e segurança para residências e empresas.',
      level: 'Intermediário'
    },
    {
      id: 8,
      title: 'Instalações Elétricas',
      category: 'Eletricista',
      price: 250,
      rating: 4.8,
      totalReviews: 142,
      freelancerName: 'Roberto Alves',
      profileImage: 'https://randomuser.me/api/portraits/women/91.jpg',
      tags: ['Elétrica', 'Instalação', 'Manutenção'],
      deliveryTime: 2,
      description: 'Serviços elétricos residenciais e comerciais com garantia.',
      level: 'Expert'
    },
    {
      id: 9,
      title: 'Serviços Hidráulicos',
      category: 'Encanador',
      price: 200,
      rating: 4.6,
      totalReviews: 95,
      freelancerName: 'José Lima',
      profileImage: 'https://randomuser.me/api/portraits/women/11.jpg',
      tags: ['Hidráulica', 'Encanamento', 'Manutenção'],
      deliveryTime: 1,
      description: 'Reparos e instalações hidráulicas com atendimento rápido.',
      level: 'Expert'
    },
    {
      id: 10,
      title: 'Móveis sob Medida',
      category: 'Carpinteiro',
      price: 800,
      rating: 4.9,
      totalReviews: 87,
      freelancerName: 'Paulo Rodrigues',
      profileImage: 'https://randomuser.me/api/portraits/women/14.jpg',
      tags: ['Móveis', 'Marcenaria', 'Personalizado'],
      deliveryTime: 5,
      description: 'Fabricação de móveis personalizados com acabamento premium.',
      level: 'Expert'
    },
    {
      id: 11,
      title: 'Portaria 24h',
      category: 'Portaria',
      price: 150,
      rating: 4.5,
      totalReviews: 73,
      freelancerName: 'Fernando Santos',
      profileImage: 'https://randomuser.me/api/portraits/women/18.jpg',
      tags: ['Portaria', 'Segurança', '24h'],
      deliveryTime: 1,
      description: 'Serviços de portaria profissional para condomínios e empresas.',
      level: 'Intermediário'
    },
    {
      id: 12,
      title: 'Limpeza Residencial',
      category: 'Limpeza',
      price: 120,
      rating: 4.7,
      totalReviews: 168,
      freelancerName: 'Marina Costa',
      profileImage: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      deliveryTime: 1,
      description: 'Serviços de limpeza completa para residências e escritórios.',
      level: 'Intermediário'
    }
  ];

  filteredServices: Service[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.selectedCategory = this.formatCategoryName(category);
        this.filteredServices = this.services.filter(
          service => service.category === this.selectedCategory
        );
      }
    });
  }

  isFilterCollapsed = false;

  toggleFilters(): void {
    this.isFilterCollapsed = !this.isFilterCollapsed;

    // Adiciona ou remove a classe 'expanded' na lista de serviços
    const catalogContent = document.querySelector('.catalog-content');
    if (catalogContent) {
      if (this.isFilterCollapsed) {
        catalogContent.classList.add('expanded');
      } else {
        catalogContent.classList.remove('expanded');
      }
    }
  }
  private formatCategoryName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  }

  applyFilters(): void {
    this.filteredServices = this.services.filter(service => {
      // Filtro por categoria
      if (service.category !== this.selectedCategory) {
        return false;
      }

      // Filtro por busca
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        const matchesSearch =
          service.title.toLowerCase().includes(searchLower) ||
          service.description.toLowerCase().includes(searchLower) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Filtro por preço
      if (this.minPrice && service.price < this.minPrice) return false;
      if (this.maxPrice && service.price > this.maxPrice) return false;

      // Filtros selecionados
      for (const [filterName, selectedOptions] of Object.entries(this.selectedFilters)) {
        if (selectedOptions.length === 0) continue;

        switch (filterName) {
          case 'Nível':
            if (!selectedOptions.includes(service.level)) return false;
            break;
          case 'Tempo de Entrega': {
            const deliveryMatch = selectedOptions.some(option => {
              if (option === 'Até 24h') return service.deliveryTime <= 1;
              if (option === '1-3 dias') return service.deliveryTime > 1 && service.deliveryTime <= 3;
              if (option === '3-7 dias') return service.deliveryTime > 3 && service.deliveryTime <= 7;
              return service.deliveryTime > 7;
            });
            if (!deliveryMatch) return false;
            break;
          }
          case 'Avaliação': {
            const ratingMatch = selectedOptions.some(option => {
              const minRating = parseFloat(option.replace('+', ''));
              return service.rating >= minRating;
            });
            if (!ratingMatch) return false;
            break;
          }
        }
      }

      return true;
    });
  }

  toggleFilter(filterName: string, option: string): void {
    if (!this.selectedFilters[filterName]) {
      this.selectedFilters[filterName] = [];
    }

    const index = this.selectedFilters[filterName].indexOf(option);
    if (index === -1) {
      this.selectedFilters[filterName].push(option);
    } else {
      this.selectedFilters[filterName].splice(index, 1);
    }

    this.applyFilters();
  }

  // Getters para evitar funções inline no template
  get nivelOptions(): string[] {
    const filter = this.filters.find(f => f.name === 'Nível');
    return filter ? filter.options : [];
  }

  get tempoEntregaOptions(): string[] {
    const filter = this.filters.find(f => f.name === 'Tempo de Entrega');
    return filter ? filter.options : [];
  }

  get avaliacaoOptions(): string[] {
    const filter = this.filters.find(f => f.name === 'Avaliação');
    return filter ? filter.options : [];
  }
}
