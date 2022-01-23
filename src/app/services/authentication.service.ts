import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap, take } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userData?: Observable<User | undefined>;
  readonly authState$: Observable<firebase.default.User | null> = this.angularFireAuth.authState;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
    ) {

    angularFireAuth.authState.subscribe(auth => {
      if(auth){
        this.userData = this.angularFirestore.doc<User>(`users/${auth.uid}`).valueChanges()
        console.log("logged in");
        console.log(auth);
      }else{
        console.log("not logged in");
        console.log(auth)
      }
      console.log("start");
    })
   }

  // SIGN UP
  SignUp(email: string, password: string, displayName: string){
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Succsessfully signed up', res);
        res.user?.updateProfile({
          displayName: displayName
        })
        this.updateUserData(res.user?.uid!, res.user?.email!, displayName),
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
      })
  }

  // SIGN IN
  SignIn(email: string, password: string){
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Succsessfully signed in', res);
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
      })
  }
  // SIGN OUT
  SignOut(){
    this.angularFireAuth
      .signOut()
      .then(res => {
        console.log('Succsessfully signed out', res);
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
      })
  }

  // Update user data in FireStore
  private updateUserData(uid:string, email:string, displayName:string){
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${uid}`);

    const data = {
      uid: uid,
      email: email,
      displayName: displayName,
      roles: {
        customer: true,
        manager: false,
        admin: false
      },
      banned: false
    }
    return userRef.set(data, {merge: true});
  }

  getUser(){
    return this.angularFireAuth.currentUser
  }
  
  isBanned(){
    return this.userData?.pipe(switchMap(user => {
      console.log(user?.banned)
      if (user?.banned){
        return of(true)
      }else return of(false)
    }))
    
  }
  setPersistence(session: string){
    this.angularFireAuth.setPersistence(session).then(val => console.log('persistance changed'))
  }
}
