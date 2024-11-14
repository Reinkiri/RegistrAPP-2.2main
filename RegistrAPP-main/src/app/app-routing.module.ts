import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MisAsignaturasPage } from './mis-asignaturas/mis-asignaturas.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mis-asignaturas',
    loadChildren: () => import('./mis-asignaturas/mis-asignaturas.module').then( m => m.MisAsignaturasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mis-asistencias',
    loadChildren: () => import('./mis-asistencias/mis-asistencias.module').then( m => m.MisAsistenciasPageModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'registrar-asistencias',
    loadChildren: () => import('./registrar-asistencias/registrar-asistencias.module').then( m => m.RegistrarAsistenciasPageModule)
  },
  {
    path: 'cambiar-clave',
    loadChildren: () => import('./cambiar-clave/cambiar-clave.module').then( m => m.CambiarClavePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu2',
    loadChildren: () => import('./menu2/menu2.module').then( m => m.Menu2PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'asistencia-detalle/:id',
    loadChildren: () => import('./asistencia-detalle/asistencia-detalle.module').then( m => m.AsistenciaDetallePageModule)
  },
  {
    path: 'revisar-asistencias',
    loadChildren: () => import('./revisar-asistencias/revisar-asistencias.module').then( m => m.RevisarAsistenciasPageModule)
  },
  {
    path: 'revisar-asistencias',
    loadChildren: () => import('./revisar-asistencias/revisar-asistencias.module').then( m => m.RevisarAsistenciasPageModule)
  },
  {
    path: 'asistencia-detalle',
    loadChildren: () => import('./asistencia-detalle/asistencia-detalle.module').then( m => m.AsistenciaDetallePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

