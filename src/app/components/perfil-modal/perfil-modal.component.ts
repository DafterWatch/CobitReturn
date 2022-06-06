import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router:Router) {
    
   }

  ngOnInit(): void {
    this.obtenerDatos()
  }

  /*Aqui rescata datos del user*/
  obtenerDatos(){

    this.nombre='FakeName'
    this.apellido='FakeApellido'
    this.contrasena='Fakecontrasena'
    this.fecha_creacion=new Date()
    this.usuario='Fakeusuario'


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
