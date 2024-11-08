import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta
import { Usuario } from '../../services/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  usuario: Usuario | null = null; // Variable para almacenar el usuario activo

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.usuario = user; // Actualiza el usuario activo
    });
  }

  logout() {
    this.authService.logout(); // Cierra sesión
    this.router.navigate(['/home']); // Redirige al inicio de sesión  
    location.reload();
  }
}