import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scannedData: any;

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private alertController: AlertController
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.platform.is('capacitor')) {
      const isSupported = await BarcodeScanner.isSupported();
      if (!isSupported) {
        this.showAlert('Error', 'Barcode scanning is not supported on this device.');
        return;
      }
      
      const  granted  = await BarcodeScanner.checkPermissions();
      if (!granted) {
        await BarcodeScanner.requestPermissions();
      }
    }
  }

  async startScan() {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [], // Puedes especificar los formatos necesarios
        lensFacing: 'back' // Configura la cámara trasera como predeterminada
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.scannedData = data.barcode; // Guarda los datos escaneados
      console.log('Datos escaneados:', this.scannedData);
    }
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}

