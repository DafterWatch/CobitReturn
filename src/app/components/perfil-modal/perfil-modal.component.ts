import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';

@Component({
  selector: 'app-perfil-modal',
  templateUrl: './perfil-modal.component.html',
  styleUrls: ['./perfil-modal.component.scss']
})
export class PerfilModalComponent implements OnInit {

  apellido:string;
  nombre:string;
  contrasena:string;
  fecha_creacion:Date;
  usuario:string;
  contrasenaGuardada:boolean=false;
  id_UserActive:any;
  usuarioRegistrado;


  constructor(private router:Router,private _firebaseCobit:FirebaseCobitService) {
   }

  ngOnInit(): void {
    this.obtenerDatos();
  }

  /*Aqui rescata datos del user*/
  obtenerDatos(){
  
    this.id_UserActive=this._firebaseCobit.getuserActive();
alert("entra al metodo")
    if(this.id_UserActive !== null){
      alert("entra al if")
      this._firebaseCobit.getUserId(this.id_UserActive).subscribe(data => {
        alert("entra al cobitservice")
        this.usuarioRegistrado.setValue({
          name: data.payload.data()['name'],
          apellido: data.payload.data()['apellido'],
          usuario: data.payload.data()['usuario'],
          contrasena: data.payload.data()['contrasena'],
          fecha_creacion: data.payload.data()['fecha_creacion'],
        })
        
      })
      alert("entra al asignacion")
      this.nombre=this.usuarioRegistrado.name;
        this.apellido=this.usuarioRegistrado.apellido;
        this.usuario=this.usuarioRegistrado.usuario;
        this.contrasena=this.usuarioRegistrado.contrasena;
        this.fecha_creacion=this.usuarioRegistrado.fecha_creacion;
    }
  }


  VerificarSeguridad(){
    if(this.contrasenaGuardada==false){
      alert("Confirme que guardo su contraseña.")
    }else{
      this.router.navigate(['/login']);
    }
  }
  cambiarCheck(value){
    this.contrasenaGuardada=!value;
  }
  
  

}
