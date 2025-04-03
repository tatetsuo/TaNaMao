// Angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  userName = 'Maria Silva';  // Nome do usuário (idealmente viria de um serviço de autenticação)
  greeting = '';
  isFreelancer = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setGreeting();

    // Atualizar nome do usuário com base no usuário autenticado
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userName = user.name.split(' ')[0] || 'Usuário';
        this.isFreelancer = user.isFreelancer || false;
      } else {
        this.userName = localStorage.getItem('username') || 'Usuário';
        this.isFreelancer = false;
      }
    });
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/guest/login']);
  }
}
