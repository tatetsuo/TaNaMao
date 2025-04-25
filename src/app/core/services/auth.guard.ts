import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): MaybeAsync<GuardResult> {
    return this.checkAuth();
  }

  canActivate(): Observable<boolean> {
    return this.checkAuth();
  }

  private redirectToLoginPage() {
    this.authService.clearUserData();
    this.router.navigate(['/authentication/side-login']);
  }

  private checkAuth(): Observable<boolean> {
    return this.authService.isLogged()
    .pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.redirectToLoginPage();
          return false;
        }
      }),
      catchError(() => {
        this.redirectToLoginPage();
        return of(false);
      })
    );
  }
}
