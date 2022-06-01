import { ReporteFinalComponent } from './components/reporte-final/reporte-final.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DominiosComponent } from './components/dominios/dominios.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { LoginComponent } from './components/login/login.component';
import { PagprincipalComponent } from './components/pagprincipal/pagprincipal.component';
import { ProcesosComponent } from './components/procesos/procesos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pagprincipal', component: PagprincipalComponent },
  { path: 'dominios', component: DominiosComponent },
  { path: 'procesos', component: ProcesosComponent },
  { path: 'evaluacion', component: EvaluacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'reporte-final', component: ReporteFinalComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
