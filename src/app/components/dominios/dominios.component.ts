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
  listaDominios: any[] = [];
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
  fieldsChange(event: any, ac: any) {
    if (event.currentTarget.checked) {
      this.listaDominios.push(ac);
    } else {
      this.listaDominios.splice(this.listaDominios.indexOf(ac), 1);
    }
  }
  verificarSeleccion() {
    if (this.listaDominios.length > 0) {
      let cadena = '';
      this.listaDominios.forEach((element) => {
        cadena = cadena + element + ',';
      });
      cadena = cadena.substring(0, cadena.length - 1);
      sessionStorage.setItem('listaDominios', cadena);
      this.router.navigate(['/procesos']);
    } else {
      alert('Debe seleccionar al menos un dominio');
    }
  }
}
