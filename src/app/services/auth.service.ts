import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'user';
  private userSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    const savedUser = localStorage.getItem(this.userKey);
    const initialUser = savedUser ? JSON.parse(savedUser) : null;
    this.userSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser$ = this.userSubject.asObservable();
  }

  /** Retorna el usuario actual (no observable) */
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  /** Retorna true si hay un usuario logueado */
  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  /** Actualiza el usuario en memoria y localStorage */
  setUser(user: User): void {
    this.userSubject.next(user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /** Limpia el usuario al cerrar sesión */
  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem(this.userKey);
  }
}
