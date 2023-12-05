import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  getFullCollection(collection: string): any {
    return this.afs
      .collection(collection)
      .valueChanges()
  }

  getDocFromCollection(collection: string, doc: string | undefined): any {
    return this.afs
      .collection(collection)
      .doc(doc)
      .get()
  }
}
