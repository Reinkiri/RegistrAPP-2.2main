import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { Usuario, Asignatura } from './usuario.model';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuariosUrl = 'http://localhost:3000/api/usuarios';
  private asignaturasUrl = 'assets/asignaturas.json';
  private asistenciasUrl = 'assets/asistencias.json';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl);
  }

  validarUsuario(correo: string, contrasena: string): Observable<Usuario | undefined> {
    return this.getUsuarios().pipe(
      map((response: any) => {
        // Verificar si la respuesta contiene una propiedad 'usuarios'
        const usuarios = Array.isArray(response.usuarios) ? response.usuarios : response;
        return usuarios.find((usuario: Usuario) => usuario.correo === correo && usuario.contrasena === contrasena);
      })
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

  getAsistencias(): Observable<any[]> {
    const url = 'http://localhost:3000/api/asistencias';
    return this.http.get<any[]>(url);
  }

  // Nuevo método para obtener los alumnos inscritos en una asignatura
  getAlumnosPorAsignatura(asignaturaId: string): Observable<any[]> {
    return this.getUsuarios().pipe(
      map((usuarios) => usuarios.filter(usuario => 
        usuario.tipo === 'alumno' && usuario.asignaturas_inscritas?.includes(asignaturaId)
      ))
    );
  }

  // Nuevo método para actualizar el JSON de asistencias
  actualizarAsistencias(asistencias: any[]): Observable<any> {
    const url = 'http://localhost:3000/api/asistencias';
    return this.http.put(url, { asistencias }).pipe(
      map((response: any) => {
        console.log('Respuesta del backend:', response);
        if (!response || !response.message) {
          throw new Error('Respuesta inesperada del servidor.');
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error al actualizar asistencias:', error);
        return throwError(() => new Error('Error al actualizar las asistencias en el servidor.'));
      })
    );
  }
  
  
}
