import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseCobitService } from 'src/app/services/firebase-cobit.service';

@Component({
  selector: 'app-pagprincipal',
  templateUrl: './pagprincipal.component.html',
  styleUrls: ['./pagprincipal.component.scss'],
})
export class PagprincipalComponent implements OnInit {
  constructor(
    private router: Router,
    private _firebaseCobit: FirebaseCobitService
  ) {}
  areas: any[] = [];
  ngOnInit(): void {
    this.getAreasFunction();
  }
  getAreasFunction() {
    this._firebaseCobit.getAreas().subscribe((data) => {
      this.areas = [];
      data.forEach((element: any) => {
        this.areas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }
  seleccionArea(event: any) {
    sessionStorage.setItem('id_area', event);
  }
}
