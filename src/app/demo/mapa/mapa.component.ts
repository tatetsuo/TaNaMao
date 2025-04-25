import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Notyf } from 'notyf';
import { ServiceDetailsComponent } from '../catalogo-servicos/service-details/service-details.component';
import { ProfissionalProximo } from 'src/app/core/interfaces/padroes';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
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
    const notyf = new Notyf();

    notyf.open({
      type: 'info',
      message: 'Veja os profissionais perto de você!',
      duration: 7000,
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'info',
        color: '#fff'
      },
      dismissible: true,
      background: '#007bff',
      position: { x: 'right', y: 'top' }
    });
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
        distancia: distancia,
        fotoPerfil: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        avaliacao: +(Math.random() * 2 + 3).toFixed(1),
        projetosCompletos: Math.floor(Math.random() * 100) + 1,
        valorHora: Math.floor(Math.random() * 150) + 50,
        nivel: ['Iniciante', 'Intermediário', 'Expert'][Math.floor(Math.random() * 3)]
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
    const serviceData = {
      id: '1',
      titulo: 'Serviço de ' + profissional.profissao,
      fotoColaborador: profissional.fotoPerfil || 'https://randomuser.me/api/portraits/men/1.jpg',
      nomeColaborador: profissional.nome,
      categoria: profissional.profissao,
      preco: profissional.valorHora || Math.floor(Math.random() * 500) + 100,
      avaliacao: profissional.avaliacao || +(Math.random() * 2 + 3).toFixed(1),
      totalAvaliacoes: profissional.projetosCompletos || Math.floor(Math.random() * 100) + 1,
      descricao: 'Descrição do serviço de ' + profissional.profissao,
      tempoEntrega: Math.floor(Math.random() * 10) + 1,
      nivel: profissional.nivel as 'Iniciante' | 'Intermediário' | 'Expert' || 'Intermediário',
      tags: ['Tag1', 'Tag2', 'Tag3']
    };

    this.dialog.open(ServiceDetailsComponent, {
      data: serviceData,
      width: '800px' 
    });
  }
}