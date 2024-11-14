import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisarAsistenciasPage } from './revisar-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: RevisarAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisarAsistenciasPageRoutingModule {}
