import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
})
export class ProcesosComponent implements OnInit {
  constructor(private router:Router, private _firebaseCobit:FirebaseCobitService) { }
  procesos: any[] = [];
  procesosLista: any[] = [];
  ngOnInit(): void {
    this.getProcesosFunction();
  }
  getProcesosFunction(){
    this._firebaseCobit.getProcesos().subscribe(data => {
      this.procesos = [];
      data.forEach((element:any) => {
        this.procesos.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      //console.log(this.procesos);
     //console.log(this.procesos[0].procesos)
      this.procesosLista = this.procesos[0].procesos["PO1"];
      //console.log(this.procesosLista)
    })
  }
  log(a:any){
    console.log(a)
  }
}
