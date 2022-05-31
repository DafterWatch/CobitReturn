import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuarios: any[] = [];
  usuariosAdmin: any[] = [];
  loginUsuario: FormGroup;
  submitted = false;
  validLogin = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _firebaseCobit: FirebaseCobitService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      pass: ['', Validators.required],
    });
    this.validLogin = true;
  }
  ngOnInit(): void {
    this.getUsuario();
  }
  iniciarSesion(email: string, pass: string) {
    this.submitted = true;
    if (this.loginUsuario.invalid) {
      return;
    }
    /*if (this.usuarios[0].usuario == email) {
      if (this.usuarios[0].contrasena == pass) {
        this.validLogin = true;
        sessionStorage.setItem('idUsuario', this.usuarios[0].id_usuario);
        this.router.navigate(['/pagprincipal']);
      } else {
        this.validLogin = false;
      }
    } else {
      this.validLogin = false;
    }*/
    if ('usuario1' == email) {
      if ('admin123' == pass) {
        this.validLogin = true;
        sessionStorage.setItem('idUsuario', 'id1');
        this.router.navigate(['/pagprincipal']);
      } else {
        this.validLogin = false;
      }
    } else {
      this.validLogin = false;
    }
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
