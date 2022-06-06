import { ReporteFinalComponent } from './components/reporte-final/reporte-final.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DominiosComponent } from './components/dominios/dominios.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { LoginComponent } from './components/login/login.component';
import { PagprincipalComponent } from './components/pagprincipal/pagprincipal.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ModificarPerfilComponent } from './components/modificar-perfil/modificar-perfil.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pagprincipal', component: PagprincipalComponent,canActivate:[AuthGuard] },
  { path: 'dominios', component: DominiosComponent,canActivate:[AuthGuard] },
  { path: 'procesos', component: ProcesosComponent,canActivate:[AuthGuard] },
  { path: 'evaluacion', component: EvaluacionComponent,canActivate:[AuthGuard] },
  { path: 'registro', component: RegistroComponent,canActivate:[AuthGuard] },
  { path: 'reporte-final', component: ReporteFinalComponent,canActivate:[AuthGuard] },
  { path: 'perfil', component: PerfilComponent,canActivate:[AuthGuard] },
  { path: 'modificarPerfil', component: ModificarPerfilComponent,canActivate:[AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
