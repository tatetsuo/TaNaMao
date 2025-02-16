import { Component, Inject, HostBinding } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

interface ServiceData {
  title: string;
  profileImage: string;
  freelancerName: string;
  category: string;
  price: number;
  rating: number;
  totalReviews: number;
  description: string;
  deliveryTime: number;
  level: string;
  tags: string[];
}

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatDividerModule, MatBadgeModule],
})
export class ServiceDetailsComponent {
  @HostBinding('class.sidebar-open') sidebarOpen = false;
  @HostBinding('class.sidebar-closed') sidebarClosed = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ServiceData) {
    this.sidebarOpen = this.isSidebarOpen();
    this.sidebarClosed = !this.sidebarOpen;
  }

  private isSidebarOpen(): boolean {

    return false; 
  }
}
