import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  usuarios: any[] = [];
  abecedario = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9",".","-","_","$","&","#","@"];
  registerUsuario: FormGroup;
  submitted = false;
  contrasena;
  validRegister = false;
  constructor(private fb: FormBuilder, private router: Router,
    private _firebaseCobit: FirebaseCobitService) {
    this.registerUsuario = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
    });
    this.validRegister = true;
  }

  ngOnInit(): void {
  }
  crearUser(name: string, lastname: string, username: string) {
    this.submitted = true;
    if (this.registerUsuario.invalid) {
      console.log('Falta campos');
      return;
    }
    console.log('Campos llenos');
    const usernew: any = {
      apellido: this.registerUsuario.value.lastname,
      contraseña: this.generarContrasena(),
      fecha_creacion:new Date(),
      id_usuario:this.getLenghtUsuarios(),
      nombre: this.registerUsuario.value.name,
      usuario: this.registerUsuario.value.username,

    }
    this._firebaseCobit.agregarUsuario(usernew).then(() => {
      console.log('Registrado');
      alert("Registrado!");
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log(error);
    })
  }

  generarContrasena(){
    this.contrasena ='';
    for(var i=0;i<5;i++){
      this.contrasena+=this.abecedario[this.getRandomInt(this.abecedario.length)]
    }
    for(var i=0;i<5;i++){
      this.contrasena+=this.getRandomInt(9)
    }
    console.log(this.contrasena);
    
    return this.contrasena;
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  getLenghtUsuarios() {
    this._firebaseCobit.getUsuarios().subscribe((data) => {
      this.usuarios = [];
      data.forEach((element: any) => {
        this.usuarios.push({
          id: element.payload.doc.id,
        });
      });
    });
    console.log(this.usuarios.length);
    

    return this.usuarios.length;
  }
}