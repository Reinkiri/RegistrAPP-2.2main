import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrCodeModule } from 'ng-qrcode';

import { IonicModule } from '@ionic/angular';

import { RevisarAsistenciasPageRoutingModule } from './revisar-asistencias-routing.module';

import { RevisarAsistenciasPage } from './revisar-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RevisarAsistenciasPageRoutingModule,
    QrCodeModule
  ],
  declarations: [RevisarAsistenciasPage]
})
export class RevisarAsistenciasPageModule {}