import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.scss']
})
export class ModificarPerfilComponent implements OnInit {
  modificarUsuario: FormGroup;
  validModifier = false;
  
  apellido:string;
  nombre:string;
  contrasena:string;
  fecha_creacion:Date;
  usuario:string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _firebaseCobit: FirebaseCobitService
  ) { 
    this.modificarUsuario = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      nwcontrasena: ['', Validators.required],
      antcontrasena: ['', Validators.required],
    });
    this.validModifier = true;
    this.obtenerDatos();
  }




  ngOnInit(): void {
    this.obtenerDatos();
  }

  modificarUser(name: string, lastname: string, username: string) {
    if (this.modificarUsuario.invalid) {
      console.log('Falta campos');
      this.validModifier=false;
      return;
    }
this.validModifier=true;
    alert("logica");
      
    }

    obtenerDatos(){

      this.nombre='FakeName'
      this.apellido='FakeApellido'
      this.contrasena='Fakecontrasena'
      this.fecha_creacion=new Date()
      this.usuario='Fakeusuario'
  
  
    }
}
