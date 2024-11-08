export interface Asignatura {
  id: string;
  nombre: string;
  seccion: string;
  profesor_id: string;
}

export interface Usuario {
  id: string;
  tipo: 'alumno' | 'profesor';
  correo: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  asignaturas_inscritas?: string[];
}
