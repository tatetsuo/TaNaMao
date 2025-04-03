import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FreelancerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica se o usuário está logado e é um freelancer
    if (this.authService.isLoggedIn() && this.authService.isFreelancer()) {
      return true;
    }

    // Se não for freelancer, redireciona para o login ou dashboard normal
    if (this.authService.isLoggedIn()) {
      // Já está logado mas não é freelancer - vai para dashboard normal
      this.router.navigate(['/default']);
    } else {
      // Não está logado - vai para o login
      this.router.navigate(['/guest/login']);
    }
    
    return false;
  }
}
