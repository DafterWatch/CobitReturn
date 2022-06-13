import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  fecha_creacion:string;
  usuario:string;
  contrasenaGuardada:boolean=false;
  id_UserActive:any;
  usuarioRegistrado;


  constructor(private fb: FormBuilder, private router:Router,private _firebaseCobit:FirebaseCobitService) {
    
    //this.getDatos(_firebaseCobit.getIdUsuario())
   }
   idUser = ""
  ngOnInit(): void {
    //this.obtenerDatos()
    this.idUser = sessionStorage.getItem('idUser')
    //console.log(this.idUser)
    this.obtenerDatos()
  }

  /*Aqui rescata datos del user*/
  obtenerDatos(){
    this.nombre= sessionStorage.getItem('nombre')
    this.apellido=sessionStorage.getItem('apellido')
    this.contrasena=sessionStorage.getItem('contrasena')
    this.fecha_creacion=sessionStorage.getItem('fecha')
    this.usuario=sessionStorage.getItem('usuario')
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
