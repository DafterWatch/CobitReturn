import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCobitService {

  public userData$=false;
  public idUserData;

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

  }
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
  agregarUsuario(user: any): Promise<any> {
    return this.firestore.collection('Usuarios').add(user);
  }
  getCatalizadores(): Observable<any> {
    return this.firestore
      .collection('Catalizadores', (ref) =>
        ref.orderBy('id_catalizador', 'desc')
      )
      .snapshotChanges();
  }
  getCriterios(): Observable<any> {
    return this.firestore
      .collection('Criterios', (ref) => ref.orderBy('id_criterio', 'desc'))
      .snapshotChanges();
  }
  agregarEvaluacion(evaluation: any): Promise<any> {
    return this.firestore.collection('Evaluaciones').add(evaluation);
  }
  getEvaluaciones(): Observable<any> {
    return this.firestore
      .collection('Evaluaciones', (ref) => ref.orderBy('fecha', 'desc'))
      .snapshotChanges();
  }
  stateLogin() {
    return this.userData$;
  }
  ChangeLogin(value) {
    return this.userData$=value;
  }
  getuserActive(){
    return this.idUserData;
  }
  setuserActive(idUser){
    this.idUserData=idUser;
  }
  getUserId(id:string):Observable<any>{
    return this.firestore.collection('Usuarios').doc(id).snapshotChanges();
  }
  actualizarUsuario(id: string, data:any): Promise<any>{
    return this.firestore.collection('Usuarios').doc(id).update(data);
  }

}
