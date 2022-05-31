import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
})
export class EvaluacionComponent implements OnInit {
  constructor() {}

  listaDominios: any[] = [];
  listaProcesos: any[] = [];
  listaRecursos: any[] = [];
  ngOnInit(): void {
    window.scroll(0, 0);
    let idUsuario = sessionStorage.getItem('id_usuario');
    let idArea = sessionStorage.getItem('id_area');
    this.listaDominios = sessionStorage.getItem('listaDominios').split(',');
    this.listaProcesos = sessionStorage.getItem('listaProcesos').split(',');
    this.listaRecursos = sessionStorage.getItem('listaRecursos').split(',');
    console.log(
      'ID Usuario: ' + idUsuario,
      'ID Area: ' + idArea,
      this.listaDominios,
      this.listaProcesos
    );
  }
}
