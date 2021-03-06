import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  usuarios: any[] = [];
  modalSwitch: boolean = false;
  abecedario = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
    '-',
    '_',
    '$',
    '&',
    '#',
    '@',
  ];
  registerUsuario: FormGroup;
  submitted = false;
  contrasena;
  validRegister = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _firebaseCobit: FirebaseCobitService
  ) {
    this.registerUsuario = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required]
    });
    this.validRegister = true;
  }
  ngOnInit(): void {
    this.getUsuario();
  }
  crearUser(name: string, lastname: string) {
    this.submitted = true;
    if (this.registerUsuario.invalid) {
      console.log('Falta campos');
      this.validRegister = false;
      return;
    }
    console.log('Campos llenos');
    const usernew: any = {
      apellido: this.registerUsuario.value.lastname,
      contrasena: this.generarContrasena(),
      fecha_creacion: new Date(),
      id_usuario: this.cantidadUsuario,
      nombre: this.registerUsuario.value.name,
      usuario: this.generarUserName(),
    };
    //alert(usernew.id_usuario)
    sessionStorage.setItem('nombre', this.registerUsuario.value.name,)
    sessionStorage.setItem('apellido', this.registerUsuario.value.lastname)
    sessionStorage.setItem('contrasena', usernew.contrasena)
    sessionStorage.setItem('fecha', new Date().toDateString())
    sessionStorage.setItem('usuario', usernew.usuario)
    this._firebaseCobit
      .agregarUsuario(usernew)
      .then(() => {
        this.router.navigate(['/perfilModal']);
        //desplegar carta de perfil y redirigir a login
      })
      .catch((error) => {
        console.log(error);
      });
  }

  generarUserName() {
    let a = 3;
    let nameA, lastnameA, username;
    nameA = this.registerUsuario.value.name;
    lastnameA = this.registerUsuario.value.lastname;


    username = nameA.substring(0, a);
    username += lastnameA.substring(0, a);
    username+='_'
    for (var i = 0; i < 3; i++) {
      username += this.getRandomInt(9);
    }
    
    return username;
  }
  generarContrasena() {
    this.contrasena = '';
    for (var i = 0; i < 5; i++) {
      this.contrasena +=
        this.abecedario[this.getRandomInt(this.abecedario.length)];
    }
    for (var i = 0; i < 5; i++) {
      this.contrasena += this.getRandomInt(9);
    }
    //alert('Su contrase??a es: ' + this.contrasena);

    return this.contrasena;
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  cantidadUsuario = 0;
  getUsuario() {
    this.cantidadUsuario = 0;
    this._firebaseCobit.getUsuarios().subscribe((data) => {
      this.usuarios = [];
      sessionStorage.setItem('cantUsuarios', data.length.toString());
      data.forEach((element: any) => {
        this.cantidadUsuario = this.generarContrasena();
        this.usuarios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });

      });

    });
    this.cantidadUsuario = parseInt(sessionStorage.getItem('cantUsuarios'));
    this.cantidadUsuario++;
  }

}
