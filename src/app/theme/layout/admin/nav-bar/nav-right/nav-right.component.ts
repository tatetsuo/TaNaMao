// Angular import
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  userName: string = 'Maria Silva';  // Nome do usuário (idealmente viria de um serviço de autenticação)
  greeting: string = '';

  ngOnInit(): void {
    this.setGreeting();
    this.userName = localStorage.getItem('username') || 'Usuário';
  }

  setGreeting(): void {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      this.greeting = 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
      this.greeting = 'Boa tarde';
    } else {
      this.greeting = 'Boa noite';
    }
  }
}
