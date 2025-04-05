import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/theme/layout/admin/navigation/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  isFreelancer?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {
    // Inicializa com um usuário mock para demonstração
    const savedUser = localStorage.getItem('currentUser');
    const initialUser = savedUser ? JSON.parse(savedUser) : {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@exemplo.com',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    
    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser = this.currentUserSubject.asObservable();
    
    if (!savedUser) {
      localStorage.setItem('currentUser', JSON.stringify(initialUser));
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login(email: string, password: string): Observable<any> {
    // Simulação de login para desenvolvimento
    return of({ 
      id: '1', 
      email, 
      name: 'Usuário Demo',
      isFreelancer: Boolean(password.includes('freelancer')) // Conversão explícita para boolean
    }).pipe(
      delay(800),
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        
        // Definir o tipo de usuário na navegação
        if (user.isFreelancer) {
          this.navigationService.setUserType('freelancer');
        } else {
          this.navigationService.setUserType('client');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // Redefinir o tipo de usuário para guest
    this.navigationService.setUserType('guest');
    this.router.navigate(['/guest/login']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  isFreelancer(): boolean {
    return this.currentUserValue?.isFreelancer || false;
  }

  updateUserProfile(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
