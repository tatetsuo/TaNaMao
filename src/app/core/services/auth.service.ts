import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() {
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

  login(email: string): Observable<User> {
    // Simulação de login - em produção, isso seria uma chamada para o backend
    const mockUser = {
      id: '1',
      name: 'João Silva',
      email: email,
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    return this.currentUser as Observable<User>;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  updateUserProfile(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
