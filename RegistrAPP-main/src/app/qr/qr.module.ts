import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrPageRoutingModule,
    QRCodeModule,
    

  ],
  declarations: [QrPage, BarcodeScanningModalComponent ]
})
export class QrPageModule {}
