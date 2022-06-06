import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { PagprincipalComponent } from './components/pagprincipal/pagprincipal.component';
import { DominiosComponent } from './components/dominios/dominios.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReporteFinalComponent } from './components/reporte-final/reporte-final.component';
import { PerfilModalComponent } from './components/perfil-modal/perfil-modal.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ModificarPerfilComponent } from './components/modificar-perfil/modificar-perfil.component';


const firebaseConfig = {
  apiKey: 'AIzaSyDWrLDx28-SG-4XOx9L_kTQVQyd4WoDjTo',
  authDomain: 'cobitpocketedition.firebaseapp.com',
  projectId: 'cobitpocketedition',
  storageBucket: 'cobitpocketedition.appspot.com',
  messagingSenderId: '20202039173',
  appId: '1:20202039173:web:83a308464c699dee5ec6ec',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProcesosComponent,
    EvaluacionComponent,
    PagprincipalComponent,
    DominiosComponent,
    RegistroComponent,
    ReporteFinalComponent,
    PerfilModalComponent,
    PerfilComponent,
    ModificarPerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
