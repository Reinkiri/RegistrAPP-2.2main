import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
})
export class CambiarClavePage {

  constructor(private router: Router, private alertController: AlertController) { }
  async continuar() {

    const alert = await this.alertController.create({
      header: 'Solicitud enviada',
      message: 'La solicitud de cambio de contraseña fue enviada a su correo institucional.',
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();

    this.router.navigate(['/menu']);
  }

}
