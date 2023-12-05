import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.afs
          .doc(`users/${user.uid}`)
          .valueChanges()
          .pipe(
            tap((r: any) => {
              const U = r;
              U.id = U.uid;
              this.userData = U;
              localStorage.setItem('user', JSON.stringify(this.userData));
            })
          )
          .pipe(take(1))
          .subscribe();
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['./']).then();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user)
          .then(() => {
            this.router.navigate(['./']).then();
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  public logout() {
    localStorage.clear();
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']).then();
    });
  }

  public setUserData(user: any) {
    const userData: IUser = {
      email: user.email,
      emailVerified: user.emailVerified,
      uid: user.uid,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    return this.afs.doc(`users/${user.uid}`).set(userData, { merge: true });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}
