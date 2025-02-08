import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('token'); // Exemplo de verificação de autenticação
    if (!isAuthenticated) {
      this.router.navigate(['/guest/login']);
      return false;
    }
    return true;
  }
}
