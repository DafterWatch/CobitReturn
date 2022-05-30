import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCobitService {
  constructor(private firestore: AngularFirestore) {}
  getDominios(): Observable<any> {
    return this.firestore
      .collection('Dominios', (ref) => ref.orderBy('id_dominios', 'asc'))
      .snapshotChanges();
  }
  getProcesos(): Observable<any> {
    return this.firestore
      .collection('Procesos', (ref) => ref.orderBy('id_proceso', 'asc'))
      .snapshotChanges();
  }
  getRecursos(): Observable<any> {
    return this.firestore
      .collection('Recursos', (ref) => ref.orderBy('id_recurso', 'asc'))
      .snapshotChanges();
  }
  getUsuarios(): Observable<any> {
    return this.firestore
      .collection('Usuarios', (ref) => ref.orderBy('id_usuario', 'desc'))
      .snapshotChanges();
  }
  getAreas(): Observable<any> {
    return this.firestore
      .collection('Areas', (ref) => ref.orderBy('id_area', 'desc'))
      .snapshotChanges();
  }
}
