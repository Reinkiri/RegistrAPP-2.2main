import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-registrar-asistencias',
  templateUrl: './registrar-asistencias.page.html',
  styleUrls: ['./registrar-asistencias.page.scss'],
})
export class RegistrarAsistenciasPage implements OnInit {

  scanResult = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform

  ) { }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'bardcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        lensFacing: LensFacing.Back
       }
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if(data){
      this.scanResult = data?.barcode?.displayValue;
    }
  }
  ngOnInit(): void {
    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

}
