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
  usuarios = [];
  contrasenaGuardada:boolean=false;

  constructor(private router:Router,private _firebaseCobit:FirebaseCobitService) {
    
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
  getUsuario() {
    this._firebaseCobit.getUsuarios().subscribe((data) => {
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }
  

}
