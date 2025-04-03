import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  // Implementando o método ngOnInit corretamente ou removendo-o
  // Opção 1: Implementar com lógica de inicialização se necessário
  ngOnInit(): void {
    // Inicializar componente - verificar se há configurações adicionais necessárias
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
