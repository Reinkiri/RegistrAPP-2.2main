import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  qrdata: string="350";

  constructor() {}

  ngOnInit() {
    this.generarQR();
  }

  generarQR() {
    const asistenciaData = {
      profesorId: "2", // Ejemplo de ID de profesor; puedes cambiarlo dinámicamente
      fecha: new Date().toISOString().split('T')[0] // Fecha en formato ISO
    };
    this.qrdata = JSON.stringify(asistenciaData);
  }
}

