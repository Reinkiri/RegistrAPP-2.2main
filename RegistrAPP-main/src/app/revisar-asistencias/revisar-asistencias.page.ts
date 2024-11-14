import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../../services/usuario.model';

@Component({
  selector: 'app-revisar-asistencias',
  templateUrl: './revisar-asistencias.page.html',
  styleUrls: ['./revisar-asistencias.page.scss'],
})
export class RevisarAsistenciasPage implements OnInit {

  asignaturaId: string = '';
  fecha: string = '';
  qrText: string = '';
  asignaturas: { id: string; nombre: string; seccion: string; profesor: string }[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private alertController: AlertController
  ) {}
  generarQR() {
    if (this.asignaturaId && this.fecha) {
      const fechaFormateada = this.fecha.split('-').reverse().join('-');
      this.qrText = `${this.asignaturaId};${fechaFormateada}`;
      console.log("Código QR generado:", this.qrText);
    } else {
      alert('Por favor, selecciona una asignatura e ingresa una fecha.');
    }
  }
  ngOnInit() {
    this.authService.user$.subscribe((usuario) => {
      if (usuario && usuario.tipo === 'profesor') {
        this.cargarAsignaturas(usuario);
      }
    });
  }

  async mostrarConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Deseas generar el código QR y registrar las asistencias?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.generarQR();
            this.generarAsistencias();
          }
        }
      ]
    });

    await alert.present();
  }

  cargarAsignaturas(usuario: any) {
    this.usuarioService.getAsignaturasInscritas(usuario).subscribe(async (asignaturas) => {
      const asignaturasConProfesor = await Promise.all(
        asignaturas.map(async (asignatura) => {
          const profesor = await this.usuarioService.getProfesorPorId(asignatura.profesor_id).toPromise();
          return {
            id: asignatura.id,
            nombre: asignatura.nombre,
            seccion: asignatura.seccion,
            profesor: profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Desconocido'
          };
        })
      );
      this.asignaturas = asignaturasConProfesor;
    });
  }

  async generarAsistencias() {
    try {
      // Obtener los alumnos inscritos en la asignatura seleccionada
      const alumnos = await this.usuarioService.getAlumnosPorAsignatura(this.asignaturaId).toPromise() || [];
      console.log("Alumnos inscritos:", alumnos);
  
      if (alumnos.length === 0) {
        console.warn("No se encontraron alumnos para la asignatura:", this.asignaturaId);
        return;
      }
  
      // Obtener las asistencias existentes
      const asistencias = await this.usuarioService.getAsistencias().toPromise() || [];
      console.log("Asistencias existentes antes de actualizar:", asistencias);
  
      const siguienteId = (asistencias.length || 0) + 1;
  
      // Crear nuevas asistencias
      const nuevasAsistencias = alumnos.map((alumno: any, index: number) => ({
        id: (siguienteId + index).toString(),
        alumno_id: alumno.id,
        asignatura_id: this.asignaturaId,
        fecha: this.fecha,
        estado: 'ausente'
      }));
  
      console.log("Nuevas asistencias a agregar:", nuevasAsistencias);
  
      if (nuevasAsistencias.length === 0) {
        console.warn("No se generaron nuevas asistencias.");
        return;
      }
  
      // Actualizar las asistencias en el backend
      asistencias.push(...nuevasAsistencias);
      const response = await this.usuarioService.actualizarAsistencias(asistencias).toPromise();
      console.log("Respuesta del backend:", response);
  
      console.log("Asistencias actualizadas correctamente en el backend.");
      alert('Asistencias generadas exitosamente.');
    } catch (error) {
      console.error("Error al generar asistencias:", error);
      alert('Ocurrió un error al generar las asistencias.');
    }
  }
}
