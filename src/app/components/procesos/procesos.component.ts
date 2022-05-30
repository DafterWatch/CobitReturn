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
  ngOnInit(): void {
    this.getProcesosFunction();
    this.getRecursosFunction();
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
}
