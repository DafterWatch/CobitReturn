import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
})
export class ProcesosComponent implements OnInit {
  constructor(
    private router: Router,
    private _firebaseCobit: FirebaseCobitService
  ) {}
  procesos: any[] = [];
  recursos: any[] = [];
  listaProcesos: any[] = [];
  listaRecursos: any[] = [];
  dominios: any[] = [];
  listaDominios: any[] = [];
  ngOnInit(): void {
    window.scroll(0, 0);
    let dominios = sessionStorage.getItem('listaDominios');
    this.listaDominios = dominios.split(',');
    this.getProcesosFunction();
    this.getRecursosFunction();
  }
  getProcesosFunction() {
    this._firebaseCobit.getProcesos().subscribe((data) => {
      this.procesos = [];
      data.forEach((element: any) => {
        let procesoArea = element.payload.doc.data().acronimo;
        procesoArea = procesoArea.substring(0, 2);
        if (this.listaDominios.includes(procesoArea)) {
          this.procesos.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        }
      });
    });
  }

  getRecursosFunction() {
    this._firebaseCobit.getRecursos().subscribe((data) => {
      this.recursos = [];
      data.forEach((element: any) => {
        this.recursos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }
  fieldsChange(event: any, ac: any) {
    if (event.currentTarget.checked) {
      this.listaProcesos.push(ac);
    } else {
      this.listaProcesos.splice(this.listaProcesos.indexOf(ac), 1);
    }
  }
  fieldsChange2(event: any, ac: any) {
    if (event.currentTarget.checked) {
      this.listaRecursos.push(ac);
    } else {
      this.listaRecursos.splice(this.listaRecursos.indexOf(ac), 1);
    }
  }
  verificarSeleccion() {
    if (this.listaProcesos.length > 0 && this.listaRecursos.length > 0) {
      //procesos
      let cadena = '';
      this.listaProcesos.forEach((element) => {
        cadena = cadena + element + ',';
      });
      cadena = cadena.substring(0, cadena.length - 1);
      sessionStorage.setItem('listaProcesos', cadena);
      //recursos
      cadena = '';
      this.listaRecursos.forEach((element) => {
        cadena = cadena + element + ',';
      });
      cadena = cadena.substring(0, cadena.length - 1);
      sessionStorage.setItem('listaRecursos', cadena);
      this.router.navigate(['/evaluacion']);
    } else {
      alert('Debe seleccionar al menos un dominio y/o recurso');
    }
  }
}
