import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user) {
      return true; // Permite el acceso
    } else {
      this.router.navigate(['/home']); // Redirige a la página de inicio de sesión
      return false; // Bloquea el acceso
    }
  }
}
