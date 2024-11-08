import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../services/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correo: string = '';
  contrasena: string = '';
  correoRestablecer: string = ''; // Variable para el correo electronico de restablecimiento
  restablecerVisible: boolean = false; // Controla la visibilidad del formulario de restablecimiento

  constructor(private router: Router, private usuarioService: UsuarioService, private authService: AuthService) {}
  ngOnInit() {
    this.correo = '';
    this.contrasena = '';
  }
  login() {
    if (!this.correo || !this.contrasena) {
      alert('Por favor, ingrese su usuario y contraseña.');
      return;
    }
    // Comprobación de usuario y contraseña
    this.usuarioService.validarUsuario(this.correo, this.contrasena).subscribe((usuario: Usuario | undefined) => {
      if (usuario) {
        this.authService.login(usuario); // Inicia sesión y almacena el usuario
        alert('Bienvenido, ' + usuario.nombre + '!');
        
        // Redirigir según el tipo de usuario
        if (usuario.tipo === 'profesor') {
          this.router.navigate(['/menu2']); // Redirige a menu2 si es profesor
        } else {
          this.router.navigate(['/menu']); // Redirige a menu si es alumno
        }
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    });
  }

  mostrarRestablecerContrasena() {
    this.restablecerVisible = true; // Muestra el formulario para restablecer la contraseña
  }

  enviarCorreo() {
    // Validación del formato de correo
    if (!this.correoRestablecer.includes('@')) {
      alert('Por favor, ingresa un correo electrónico válido que contenga "@".');
      return;
    }

    // Aquí puedes agregar la lógica para enviar el correo de restablecimiento
    console.log(`Correo enviado a: ${this.correoRestablecer}`);
    alert('Se ha enviado un correo para restablecer su contraseña.');
    this.restablecerVisible = false; // Oculta la opción después de enviar
    this.correoRestablecer = ''; // Limpia el campo de correo
  }
}
