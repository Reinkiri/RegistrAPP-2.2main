import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.page.html',
  styleUrls: ['./mis-asistencias.page.scss'],
})
export class MisAsistenciasPage implements OnInit {
  asistencias: {nombreAsig: string; fecha: Date; presente: boolean }[] = [
    { nombreAsig: 'Ética para el trabajo', fecha: new Date('2023-09-01T00:00:00'), presente: true },  // 01/09/2023
    { nombreAsig: 'Estadística descriptiva', fecha: new Date('2023-09-05T00:00:00'), presente: true}, // 05/09/2023
    { nombreAsig: 'Progamación de aplicaciones móviles', fecha: new Date('2023-09-10T00:00:00'), presente: false }, // 10/09/2023
    { nombreAsig: 'Inglés intermedio', fecha: new Date('2023-09-12T00:00:00'), presente: true },  // 12/09/2023
  ];
  

  constructor() {
    console.log(this.asistencias);
  }

  ngOnInit() {}
}
