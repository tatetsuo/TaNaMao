import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true
})
export class CardComponent {
  // public props
  @Input() cardTitle: string;
  @Input() customHeader: boolean;
}
