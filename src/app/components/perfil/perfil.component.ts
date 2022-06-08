import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  apellido:string;
  nombre:string;
  contrasena:string;
  fecha_creacion:Date;
  usuario:string;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.obtenerDatos()
  }

  obtenerDatos(){
    this.usuario = sessionStorage.getItem('usuario');
    this.contrasena = sessionStorage.getItem('contrasena');
  }
  returnSistem(){
    this.router.navigate(['/pagprincipal']);
  }
  editPerfil(){
    this.router.navigate(['/modificarPerfil']);
  }
}
