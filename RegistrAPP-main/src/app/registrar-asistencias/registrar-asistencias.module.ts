import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAsistenciasPageRoutingModule } from './registrar-asistencias-routing.module';

import { RegistrarAsistenciasPage } from './registrar-asistencias.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAsistenciasPageRoutingModule
  ],
  declarations: [RegistrarAsistenciasPage,BarcodeScanningModalComponent]
})
export class RegistrarAsistenciasPageModule {}
