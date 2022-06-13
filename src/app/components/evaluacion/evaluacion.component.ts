import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {
  hallazgo: FormGroup;
  validHallazgo = false;
  constructor(
    private fb: FormBuilder,
    private _firebaseCobit: FirebaseCobitService,
    private router: Router
  ) {
    this.hallazgo = this.fb.group({
      criterio: ['', Validators.required],
      condicion: ['', Validators.required],
      causa: ['', Validators.required],
      efecto: ['', Validators.required],
      conclusion: ['', Validators.required],
    });
    this.validHallazgo = true;
  }




  listaDominios: any[] = [];
  listaDominiosString: any[] = [];
  listaProcesos: any[] = [];
  listaProcesosString: any[] = [];
  listaRecursos: any[] = [];
  criterios: any[] = [];
  listaCriteriosOrdenados: any[] = [];
  catalizadores: any[] = [];
  listaCatalizadores: any[] = [];
  listaProcesosSeleccionados: any[] = [];
  listaCatalizadoresHabilidad: any[] = [];
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
  fieldsChange(event: any, ac: any, pc: any, cat: any) {
    if (event.currentTarget.checked) {
      this.listaCatalizadores.push(ac);
      this.listaProcesosSeleccionados.push(pc);
      this.listaCatalizadoresHabilidad.push(cat);
    } else {
      this.listaCatalizadores.splice(this.listaCatalizadores.indexOf(ac), 1);
      this.listaProcesosSeleccionados.splice(this.listaProcesosSeleccionados.indexOf(pc), 1);
      this.listaCatalizadoresHabilidad.splice(this.listaCatalizadoresHabilidad.indexOf(cat), 1);
    }
  }
  formaterarfecha() {
    var date = new Date();
    const formatDate = (date) => {
      let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      return formatted_date;
    }
    return (formatDate(date));
  }
  verificarSeleccion() {
    if (this.hallazgo.invalid) {
      console.log('Falta campos');
      alert('Complete los campos del hallazgo')
      return;
    }
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


  /*
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
  }*/


  obtenerDominios() {

    switch (this.listaDominios[0]) {
      case "PO":
        this.listaDominiosString[0] = "PLANEAR Y ORGANIZAR (PO)"; break;
      case "AI":
        this.listaDominiosString[0] = "ADQUISICIÓN E IMPLEMENTACIÓN (AI)";
        break;
      case "DS":
        this.listaDominiosString[0] = "SERVICIOS Y SOPORTE (DS)";
        break;
      case "ME":
        this.listaDominiosString[0] = "MONITOREO Y EVALUAR (ME)"
        break;
      default:
        this.listaDominiosString[0] = "-"
        break;
    }
    switch (this.listaDominios[1]) {
      case "PO":
        this.listaDominiosString[1] = "PLANEAR Y ORGANIZAR (PO)"; break;
      case "AI":
        this.listaDominiosString[1] = "ADQUISICIÓN E IMPLEMENTACIÓN (AI)";
        break;
      case "DS":
        this.listaDominiosString[1] = "SERVICIOS Y SOPORTE (DS)";
        break;
      case "ME":
        this.listaDominiosString[1] = "MONITOREO Y EVALUAR (ME)"
        break;
      default:
        this.listaDominiosString[1] = "-"
        break;
    }
    switch (this.listaDominios[2]) {
      case "PO":
        this.listaDominiosString[2] = "PLANEAR Y ORGANIZAR (PO)"; break;
      case "AI":
        this.listaDominiosString[2] = "ADQUISICIÓN E IMPLEMENTACIÓN (AI)";
        break;
      case "DS":
        this.listaDominiosString[2] = "SERVICIOS Y SOPORTE (DS)";
        break;
      case "ME":
        this.listaDominiosString[2] = "MONITOREO Y EVALUAR (ME)"
        break;
      default:
        this.listaDominiosString[2] = "-"
        break;
    }
    switch (this.listaDominios[3]) {
      case "PO":
        this.listaDominiosString[3] = "PLANEAR Y ORGANIZAR (PO)"; break;
      case "AI":
        this.listaDominiosString[3] = "ADQUISICIÓN E IMPLEMENTACIÓN (AI)";
        break;
      case "DS":
        this.listaDominiosString[3] = "SERVICIOS Y SOPORTE (DS)";
        break;
      case "ME":
        this.listaDominiosString[3] = "MONITOREO Y EVALUAR (ME)"
        break;
      default:
        this.listaDominiosString[3] = "-"
        break;
    }

  }



  createPdf() {


    console.log(this.hallazgo.value.criterio);

    this.obtenerDominios();
    const pdfReporte: any = {
      content: [
        {
          text: 'INFORME FINAL',
          style: 'header',
          alignment: 'center'
        },
        { text: '\n' },
        {
          style: 'tableExample',
          table: {
            widths: [160, '*'],
            body: [
              ['Lider de Auditoria', this.idUsuario],
              ['Auditor de sistemas', this.idUsuario],
              ['Objetivo', 'AUDITORIA PARA LA EVALUACIÓN DE CONTROL INTERNO Y CUMPLIMIENTO DE LOS REQUISITOS DE SEGURIDAD DEL AREA DE ' + this.idArea + ' DE LA EMPRESA CEIBO.'],
              ['Tipo de informe', 'Final'],

              ['Fecha de apertura', this.formaterarfecha()],
              ['Fecha de cierre', this.formaterarfecha()],
              ['Fecha de presentación', this.formaterarfecha()]
            ]
          }
        },
        {
          text: '\n I. ALCANCE',
          style: 'subheader'
        },
        '\n Evaluación de la verificación y comprobación de catalizadores según procesos que se seleccionaron en base a la auditoria dentro de cada dominio identificado en base a la Matriz COBIT, describiendo el número de criterios y requerimientos.',
        {
          text: '\n II. Metodología de evaluación',
          style: 'subheader'
        },
        '\n Se planteó la metodología de evaluación tomando en cuenta el relevamiento y auditoria basada en riesgos con el modelo COBIT 2019, considerando técnicas y herramientas de auditoria consistentes en la revisión de documentos provistos por personal del área de la empresa CEIBO, información y documentos por parte del responsable.',
        '\n Las técnicas y herramientas utilizadas fueron: \n',
        {
          ul: [
            ' Elaboración de encuestas y checklist de relevamiento de información en base a normativa y servicios contratados entre el area de ' + this.idArea + ' , Proveedor y el modelo COBIT basado en estándares internacionales.',
            'Registro de entrevistas con el responsable.',
            'Registro de entrevistas con responsables de la area de ' + this.idArea + ', como auditoría interna, riesgos y seguridad de información con el objetivo de cruzar algunos controles',
          ]
        },
        {
          text: '\n II. ASPECTOS RELEVANTES',
          style: 'subheader'
        },
        '\n El proveedor de servicios de tecnología y desarrollo de la empresa CEIBO presenta un adecuado nivel de experiencia en el mercado, mantiene un adecuado nivel de solidez financiera lo que permite inferir su permanencia en el mercado tecnológico. ',
        '\n De la misma manera, se identifican aspectos relevantes respecto al conocimiento y experiencia técnica del personal, tanto a nivel ejecutivo como operativo.',
        {
          text: '\n III. ASPECTOS POR MEJORAR',
          style: 'subheader'
        },
        '\n Se encontraron mejoras en el proceso del que maneja la empresa CEIBO, en el que el Proveedor de TI presenta solidez y experiencia en el mercado.',
        {
          text: '\n IV. HALLAZGOS DE AUDITORÍA',
          style: 'subheader'
        },
        {
          text: '\n DOMINIOS SELECCIONADOS',
          style: 'subheader'
        },
        /*this.listaCatalizadoresHabilidad,
        this.listaProcesosSeleccionados,
        this.listaCatalizadores,*/
        '\n DOMINIO: ' + this.listaDominiosString[0],
        '\n DOMINIO: ' + this.listaDominiosString[1],
        '\n DOMINIO: ' + this.listaDominiosString[2],
        '\n DOMINIO: ' + this.listaDominiosString[3],
        {
          text: '\n CATALIZADORES OBTENIDOS',
          style: 'subheader'
        },

        {
          style: 'tableExample',
          table: {
            widths: [200, 200, '*'],
            body: [
              ['Documento', 'Catalizador', 'Proceso'],
              [this.listaCatalizadores.slice(), this.listaCatalizadoresHabilidad.slice(), this.listaProcesosSeleccionados.slice()]
            ]
          }
        },
        {
          text: '\n RECURSOS DE TI .\n\n',
          style: 'subheader'
        },
        {
          text: [
            { text: '.\n\n' + this.listaRecursos.slice(), italics: true, },
            '.\n\n'
          ]
        },
        {
          text: '\n CRITERIOS Y REQUERIMIENTOS .\n\n',
          style: 'subheader'
        },
        {
          style: 'tableExample',
          alignment: 'center',
          table: {
            widths: ['*', 160],
            body: [
              ['CRITERIOS', 'CANTIDAD'],
              ['Efectividad: ', this.efectividad],
              ['Eficiencia: ', this.eficiencia],
              ['Disponibilidad: ', this.disponibilidad],
              ['Confidencialidad: ', this.confidencialidad],
              ['Integridad: ', this.integridad],
              ['Cumplimiento: ', this.cumplimiento],
              ['Confiabilidad: ', this.confiabilidad],

            ]
          }
        },
        {
          text: '\n HALLAZGO No. 1',
          style: 'subheader'
        },
        {
          text: 'Condición: ' ,
          style: 'quote'
        },
        {
          text: this.hallazgo.value.condicion,
        },
        {
          text: 'Criterio: ' ,
          style: 'quote'
        },
        ,
        {
          text: this.hallazgo.value.criterio
        },
        {
          text: 'Causa: ' ,
          style: 'quote'
        },
        ,
        {
          text: this.hallazgo.value.causa
        },
        {
          text: 'Efecto: ' ,
          style: 'quote'
        },
        ,
        {
          text: this.hallazgo.value.efecto
        },
        {
          text: '\n V. CONCLUSIONES',
          style: 'subheader'
        },
        this.hallazgo.value.conclusion,
        {
          style: 'tableExample',
          table: {
            widths: [200, 200, '*'],
            body: [
              ['Nombre completo', 'Responsabilidad', 'Firma'],
              [this.idUsuario.slice(), 'Auditor principal', '']
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
        },
        subheader: {
          fontSize: 15,
          bold: true,
          alignment: 'justify'
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        quote: {
          italics: true,
          bold: true,
          fontSize: 15,
        },
      }

    }
    const pdf = pdfMake.createPdf(pdfReporte);
    pdf.open();
  }
}
