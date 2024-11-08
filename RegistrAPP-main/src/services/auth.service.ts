
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from './usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  login(usuario: Usuario) {
    this.userSubject.next(usuario);
  }

  logout() {
    this.userSubject.next(null);
  }

  getUser(): Usuario | null {
    return this.userSubject.value;
  }
}
