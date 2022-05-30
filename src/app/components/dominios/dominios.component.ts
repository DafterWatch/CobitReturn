import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';

@Component({
  selector: 'app-dominios',
  templateUrl: './dominios.component.html',
  styleUrls: ['./dominios.component.scss'],
})
export class DominiosComponent implements OnInit {
  constructor(
    private router: Router,
    private _firebaseCobit: FirebaseCobitService
  ) {}
  dominios: any[] = [];
  ngOnInit(): void {
    this.getDominiosFunction();
  }
  getDominiosFunction() {
    this._firebaseCobit.getDominios().subscribe((data) => {
      this.dominios = [];
      data.forEach((element: any) => {
        this.dominios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }
  confirmado1: boolean = false;
  confirmado2: boolean = false;
  confirmado3: boolean = false;
  confirmado4: boolean = false;
  fieldsChange(event: any, id: any) {
    console.log(event.currentTarget.checked, id);
    switch (id) {
      case 1:
        if (event.currentTarget.checked) {
          this.confirmado1 = true;
        } else {
          this.confirmado1 = false;
        }
        break;
      case 2:
        if (event.currentTarget.checked) {
          this.confirmado2 = true;
        } else {
          this.confirmado2 = false;
        }
        break;
      case 3:
        if (event.currentTarget.checked) {
          this.confirmado3 = true;
        } else {
          this.confirmado3 = false;
        }
        break;
      case 4:
        if (event.currentTarget.checked) {
          this.confirmado4 = true;
        } else {
          this.confirmado4 = false;
        }
        break;
    }
  }
  cadena: string = '';
  validadoPasar: boolean = false;
  verificarSeleccion() {
    this.cadena = '';
    if (
      !this.confirmado1 &&
      !this.confirmado2 &&
      !this.confirmado3 &&
      !this.confirmado4
    ) {
      this.validadoPasar = false;
    } else {
      this.validadoPasar = true;
      if (this.confirmado1) {
        this.cadena += this.dominios[0].id_dominios + ',';
      }
      if (this.confirmado2) {
        this.cadena += this.dominios[1].id_dominios + ',';
      }
      if (this.confirmado3) {
        this.cadena += this.dominios[2].id_dominios + ',';
      }
      if (this.confirmado4) {
        this.cadena += this.dominios[3].id_dominios + ',';
      }
      this.cadena = this.cadena.substring(0, this.cadena.length - 1);
    }
    if (this.validadoPasar) {
      sessionStorage.setItem('dominios', this.cadena);
      this.router.navigate(['/procesos']);
    }
  }
}
