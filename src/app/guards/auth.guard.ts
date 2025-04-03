import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    // Verifica se o usuário está logado
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Se não estiver logado, redireciona para o login
    this.router.navigate(['/guest/login']);
    return false;
  }
}
