import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {
  constructor(
    private _firebaseCobit: FirebaseCobitService,
    private router: Router
  ) {}

  listaDominios: any[] = [];
  listaProcesos: any[] = [];
  listaRecursos: any[] = [];
  criterios: any[] = [];
  listaCriteriosOrdenados: any[] = [];
  catalizadores: any[] = [];
  listaCatalizadores: any[] = [];
  fecha_actual = new Date().toString();
  idUsuario = '';
  idArea = '';
  listaCatalizadoresString = '';
  listaCantCatalizadoresString = '';
  ngOnInit(): void {
    window.scroll(0, 0);
    this.idUsuario = sessionStorage.getItem('id_usuario');
    this.idArea = sessionStorage.getItem('id_area');
    this.listaDominios = sessionStorage.getItem('listaDominios').split(',');
    this.listaProcesos = sessionStorage.getItem('listaProcesos').split(',');
    this.listaRecursos = sessionStorage.getItem('listaRecursos').split(',');
    /*console.log(
      'ID Usuario: ' + idUsuario,
      'ID Area: ' + idArea,
      'lista dominios',
      this.listaDominios,
      'lista procesos',
      this.listaProcesos,
      'lista recursos',
      this.listaRecursos
    );*/
    this.getCatalizadoresFunction();
    this.getCriteriosFunction();
  }
  getCatalizadoresFunction() {
    this._firebaseCobit.getCatalizadores().subscribe((data) => {
      this.catalizadores = [];
      data.forEach((element: any) => {
        let procesoX = '';
        procesoX = element.payload.doc.data().proceso.toString();
        if (this.listaProcesos.includes(procesoX)) {
          this.catalizadores.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data(),
          });
        }
      });
      this.catalizadores.sort();
    });
  }
  efectividad = 0;
  eficiencia = 0;
  confidencialidad = 0;
  integridad = 0;
  disponibilidad = 0;
  cumplimiento = 0;
  confiabilidad = 0;
  compare(a, b) {
    const bandA = a.valor;
    const bandB = b.valor;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison * -1;
  }
  getCriteriosFunction() {
    this._firebaseCobit.getCriterios().subscribe((data) => {
      this.criterios = [];
      let cadena = '';
      data.forEach((element: any) => {
        this.criterios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      for (let i = 0; i < this.criterios.length; i++) {
        let variable = this.criterios[i].acronimo.toString();
        if (this.listaProcesos.includes(variable)) {
          cadena = this.criterios[i].criterios.split(',');
          this.efectividad += parseInt(cadena[0]);
          this.eficiencia += parseInt(cadena[1]);
          this.confidencialidad += parseInt(cadena[2]);
          this.integridad += parseInt(cadena[3]);
          this.disponibilidad += parseInt(cadena[4]);
          this.cumplimiento += parseInt(cadena[5]);
          this.confiabilidad += parseInt(cadena[6]);
        }
      }
      this.listaCriteriosOrdenados.push({
        nombre: 'Efectividad',
        valor: this.efectividad,
      });
      this.listaCriteriosOrdenados.push({
        nombre: 'Eficiencia',
        valor: this.eficiencia,
      });
      this.listaCriteriosOrdenados.push({
        nombre: 'Confidencialidad',
        valor: this.confidencialidad,
      });
      this.listaCriteriosOrdenados.push({
        nombre: 'Integridad',
        valor: this.integridad,
      });
      this.listaCriteriosOrdenados.push({
        nombre: 'Disponibilidad',
        valor: this.disponibilidad,
      });
      this.listaCriteriosOrdenados.push({
        nombre: 'Cumplimiento',
        valor: this.cumplimiento,
      });
      this.listaCriteriosOrdenados.push({
        nombre: 'Confiabilidad',
        valor: this.confiabilidad,
      });
      this.listaCriteriosOrdenados.sort(this.compare);
    });
  }
  fieldsChange(event: any, ac: any) {
    if (event.currentTarget.checked) {
      this.listaCatalizadores.push(ac);
    } else {
      this.listaCatalizadores.splice(this.listaCatalizadores.indexOf(ac), 1);
    }
  }
  verificarSeleccion() {
    let cadena = '';
    let cant = 0;
    this.listaCatalizadores.forEach((element) => {
      cant++;
      cadena = cadena + element + ',';
    });
    cadena = cadena.substring(0, cadena.length - 1);
    sessionStorage.setItem('listaCatalizadores', cadena);
    sessionStorage.setItem('cantidadCatalizadores', cant.toString());
    this.listaCatalizadoresString =
      sessionStorage.getItem('listaCatalizadores');
    this.listaCantCatalizadoresString = sessionStorage.getItem(
      'cantidadCatalizadores'
    );
    this.createPdf();
    const criteriosLista =
      'Efectividad: ' +
      this.efectividad +
      ', ' +
      'Eficiencia: ' +
      this.eficiencia +
      ', ' +
      'Confidencialidad: ' +
      this.confidencialidad +
      ', ' +
      'Integridad: ' +
      this.integridad +
      ', ' +
      'Disponibilidad: ' +
      this.disponibilidad +
      ', ' +
      'Cumplimiento: ' +
      this.cumplimiento +
      ', ' +
      'Confiabilidad: ' +
      this.confiabilidad;
    const newevaluation: any = {
      usuario: this.idUsuario,
      fecha: this.fecha_actual,
      area: this.idArea,
      dominios: sessionStorage.getItem('listaDominios'),
      procesos: sessionStorage.getItem('listaProcesos'),
      recursos: sessionStorage.getItem('listaRecursos'),
      criterios: criteriosLista,
      catalizadores: this.listaCatalizadoresString,
    };
    this._firebaseCobit
      .agregarEvaluacion(newevaluation)
      .then(() => {
        alert('Evaluación concluida');
        this.router.navigate(['/pagprincipal']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  createPdf() {
    const pdfReporte: any = {
      content: [
        {
          text: 'REPORTE EVALUACIÓN EN BASE A COBIT19',
          style: 'header',
        },
        '\n El auditor : "' +
          this.idUsuario +
          '" ah realizado la evaluacion en fecha: ' +
          this.fecha_actual +
          '.',
        '\n Se realizo esta evaluación al area de: ' +
          this.idArea +
          ' de la empresa El Ceibo.',
        '\n Los dominios identificados para esta evaluación son: ' +
          this.listaDominios +
          '.',
        '\n Los procesos identificados para esta evaluación son: ' +
          this.listaProcesos +
          '.',
        '\n Los recursos identificados para esta evaluación son: ' +
          this.listaRecursos +
          '.',
        '\n La cantidad de criterios que se cumplen son:',
        'Efectividad: ' + this.efectividad,
        'Eficiencia: ' + this.eficiencia,
        'Disponibilidad: ' + this.disponibilidad,
        'Confidencialidad: ' + this.confidencialidad,
        'Integridad: ' + this.integridad,
        'Cumplimiento: ' + this.cumplimiento,
        'Confiabilidad: ' + this.confiabilidad,
        '\n Los catalizadores que se lograron conseguir por parte de la empresa son: ',
        this.listaCatalizadores,
      ],
    };
    const pdf = pdfMake.createPdf(pdfReporte);
    pdf.open();
  }
}
