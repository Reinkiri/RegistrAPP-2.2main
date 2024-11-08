import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Asignatura } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosUrl = 'assets/usuarios.json';
  private asignaturasUrl = 'assets/asignaturas.json';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ usuarios: Usuario[] }>(this.usuariosUrl).pipe(
      map(response => response.usuarios)
    );
  }

  validarUsuario(correo: string, contrasena: string): Observable<Usuario | undefined> {
    return this.getUsuarios().pipe(
      map((data) => data.find(usuario => usuario.correo === correo && usuario.contrasena === contrasena))
    );
  }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<{ asignaturas: Asignatura[] }>(this.asignaturasUrl).pipe(
      map(response => response.asignaturas)
    );
  }

  getAsignaturasInscritas(usuario: Usuario): Observable<Asignatura[]> {
    return this.getAsignaturas().pipe(
      map((asignaturas) =>
        asignaturas.filter(asignatura =>
          usuario.asignaturas_inscritas?.includes(asignatura.id)
        )
      )
    );
  }

  getProfesorPorId(profesorId: string): Observable<{ nombre: string; apellido: string } | undefined> {
    return this.getUsuarios().pipe(
      map((usuarios) => {
        const profesor = usuarios.find(usuario => usuario.id === profesorId && usuario.tipo === 'profesor');
        return profesor ? { nombre: profesor.nombre, apellido: profesor.apellido } : undefined;
      })
    );
  }
  setAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<{ asignaturas: Asignatura[] }>(this.asignaturasUrl).pipe(
      map(response => response.asignaturas)
    );
  }
}