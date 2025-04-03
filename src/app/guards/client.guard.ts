import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Verifica se o usuário está logado e NÃO é um freelancer
    if (this.authService.isLoggedIn() && !this.authService.isFreelancer()) {
      return true;
    }

    // Se for freelancer, redireciona para o dashboard de prestador
    if (this.authService.isLoggedIn()) {
      // Já está logado mas é freelancer - vai para dashboard de prestador
      this.router.navigate(['/prestador-dashboard']);
    } else {
      // Não está logado - vai para o login
      this.router.navigate(['/guest/login']);
    }
    
    return false;
  }
}
