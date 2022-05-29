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
}
