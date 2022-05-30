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
  procesosListaPO: any[] = [];
  procesosListaAI: any[] = [];
  procesosListaDS: any[] = [];
  procesosListaME: any[] = [];
  ngOnInit(): void {
    this.getProcesosFunction();
  }
  getProcesosFunction() {
    this._firebaseCobit.getProcesos().subscribe((data) => {
      this.procesos = [];
      data.forEach((element: any) => {
        this.procesos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
      console.log(this.procesos);
    });
  }
  imprimirLog(event: any) {
    console.log(event);
  }
}
