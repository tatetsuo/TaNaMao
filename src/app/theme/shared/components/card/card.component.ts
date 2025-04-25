import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracaoCard } from 'src/app/core/interfaces/padroes';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardTitle: string;
  @Input() cardClass: string;
  @Input() blockClass: string;
  @Input() headerClass: string;
  @Input() options: boolean;
  @Input() hidHeader: boolean;
  @Input() customHeader: boolean;
  @Input() cardCaption: string;
  @Input() captionClass: string;
  @Input() isCardFooter: boolean;
  @Input() footerClass: string;

  // Alternativa usando a interface ConfiguracaoCard
  @Input() config?: ConfiguracaoCard;

  public animation: string;
  public fullCard: string;
  public isAnimating: boolean;
  public collapsedCard: string;
  public collapsedIcon: string;
  public loadCard: boolean;
  public cardRemove: string;

  constructor() {
    this.animation = '';
    this.fullCard = '';
    this.isAnimating = false;
    this.collapsedCard = 'expanded';
    this.collapsedIcon = 'ti-minus';
    this.loadCard = false;
    this.cardRemove = 'open';

    this.options = false;
    this.hidHeader = false;
    this.customHeader = false;
    this.isCardFooter = false;
    this.cardTitle = '';
    this.cardClass = '';
    this.blockClass = '';
    this.headerClass = '';
    this.cardCaption = '';
    this.captionClass = '';
    this.footerClass = '';
  }

  ngOnInit(): void {
    // Aplicar configurações se fornecidas
    if (this.config) {
      this.cardTitle = this.config.tituloCard || this.cardTitle;
      this.cardClass = this.config.classeCard || this.cardClass;
      this.blockClass = this.config.classeBloco || this.blockClass;
      this.headerClass = this.config.classeHeader || this.headerClass;
      this.options = this.config.temOpcoes || this.options;
      this.hidHeader = this.config.ocultarHeader || this.hidHeader;
      this.customHeader = this.config.headerPersonalizado || this.customHeader;
      this.cardCaption = this.config.legendaCard || this.cardCaption;
      this.captionClass = this.config.classeLegenda || this.captionClass;
      this.isCardFooter = this.config.temRodape || this.isCardFooter;
      this.footerClass = this.config.classeRodape || this.footerClass;
    }
    
    this.loadCardOptions();
  }

  // Método para carregar opções do cartão
  private loadCardOptions(): void {
    // Se necessário, aqui poderíamos inicializar configurações adicionais
  }

  // Métodos para animações e controle do cartão
  cardToggleHandler(): void {
    this.cardRemove = this.cardRemove === 'closed' ? 'open' : 'closed';
  }

  cardCollapseHandler(): void {
    this.collapsedCard = this.collapsedCard === 'collapsed' ? 'expanded' : 'collapsed';
    this.collapsedIcon = this.collapsedCard === 'collapsed' ? 'ti-plus' : 'ti-minus';
  }

  fullScreenHandler(): void {
    this.fullCard = this.fullCard === 'full-card' ? '' : 'full-card';
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  setCardRefresh(): void {
    this.loadCard = true;
    setTimeout(() => {
      this.loadCard = false;
    }, 1500);
  }
}
