import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfissionalModalComponent } from '../profissional-modal/profissional-modal.component';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumbs/breadcrumbs.component';

export interface ProfissionalProximo {
  lat: number;
  lng: number;
  profissao: string;
  nome: string;
  distancia: number; // em km
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, MatDialogModule, BreadcrumbComponent],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  private map!: L.Map;
  private fortaleza = {
    lat: -3.7319,
    lng: -38.5267
  };
  localizando = false;

  private profissoes = [
    'jardineiro', 'encanador', 'faxineira', 'eletricista',
    'pintor', 'pedreiro', 'marceneiro', 'diarista'
  ];

  private nomes = [
    'João Silva', 'Maria Santos', 'Ana Oliveira', 'Pedro Costa',
    'Carlos Lima', 'Fernanda Souza', 'Ricardo Oliveira', 'Luciana Pereira',
    'Marcos Santos', 'Julia Lima', 'Bruno Costa', 'Patricia Soares'
  ];

  private profissionaisProximos: ProfissionalProximo[] = [];

  constructor(private dialog: MatDialog) { }

  async ngOnInit() {
    await this.carregarMapa();
  }

  private async carregarMapa(): Promise<void> {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    this.localizando = true;
    await this.obterLocalizacaoPrecisa();
  }

  private async obterLocalizacaoPrecisa(): Promise<void> {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });

      const { latitude, longitude } = position.coords;
      this.createMap(latitude, longitude);
      this.gerarProfissionaisProximos(latitude, longitude);
    } catch (error) {
      console.warn('Erro ao obter localização:', error);
      this.createMap(this.fortaleza.lat, this.fortaleza.lng);
      this.gerarProfissionaisProximos(this.fortaleza.lat, this.fortaleza.lng);
    } finally {
      this.localizando = false;
    }
  }

  private createMap(lat: number, lng: number): void {
    this.map = L.map('map').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    })
      .addTo(this.map)
      .bindPopup('Sua localização atual');

    L.circle([lat, lng], {
      radius: 5000,
      fillColor: '#007bff',
      fillOpacity: 0.1,
      color: '#007bff',
      weight: 1
    }).addTo(this.map);
  }

  private gerarProfissionaisProximos(lat: number, lng: number): void {
    const quantidade = Math.floor(Math.random() * 11) + 20;

    for (let i = 0; i < quantidade; i++) {
      const distancia = (Math.random() * 4.9 + 0.1);
      const angulo = Math.random() * 2 * Math.PI;

      const latKm = 0.009;
      const lngKm = 0.009;

      const novaLat = lat + (Math.cos(angulo) * distancia * latKm);
      const novaLng = lng + (Math.sin(angulo) * distancia * lngKm);

      this.profissionaisProximos.push({
        lat: novaLat,
        lng: novaLng,
        profissao: this.profissoes[Math.floor(Math.random() * this.profissoes.length)],
        nome: this.nomes[Math.floor(Math.random() * this.nomes.length)],
        distancia: distancia
      });
    }

    this.adicionarProfissionaisAoMapa();
  }

  private adicionarProfissionaisAoMapa(): void {
    const getIconUrl = (profissao: string): string => {
      const iconMap: Record<string, string> = {
        jardineiro: 'plant-2',
        encanador: 'tool',
        faxineira: 'broom',
        eletricista: 'bolt',
        pintor: 'brush',
        pedreiro: 'building',
        marceneiro: 'wood',
        diarista: 'home'
      };

      return `https://api.iconify.design/tabler/${iconMap[profissao] || 'user'}.svg`;
    };

    this.profissionaisProximos.forEach(prof => {
      const icon = L.icon({
        iconUrl: getIconUrl(prof.profissao),
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const marker = L.marker([prof.lat, prof.lng], { icon })
        .addTo(this.map)
        .bindPopup(`
          <strong>${prof.nome}</strong><br>
          ${prof.profissao}<br>
          Distância: ${prof.distancia.toFixed(1)} km
        `);

      marker.on('click', () => this.abrirModal(prof));
    });
  }

  private abrirModal(profissional: ProfissionalProximo): void {
    this.dialog.open(ProfissionalModalComponent, {
      data: profissional,
      width: '400px'
    });
  }
}