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

  registerUsuario: FormGroup;
  submitted = false;
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
      contraseña: 'generar',
      fecha_creacion:'obtener',
      id_usuario:'obtener',
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
  
}