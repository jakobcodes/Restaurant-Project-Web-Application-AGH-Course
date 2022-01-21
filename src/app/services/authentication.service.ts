import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable, of, switchMap } from 'rxjs';

import { User } from '../models/user';
import { Roles } from '../models/roles';

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
    // angularFireAuth.authState.pipe(
    //   switchMap((user:firebase.default.User)=> {
    //     if (user) {
    //       this.userData = this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
    //     }else{
    //       this.userData = of(null)
    //     }
    //   })
    // )
    // angularFireAuth.authState.pipe(
    //   map(user => {
    //     if(user){
    //       this.userData = this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges()
    //     }
    //   })
    // )


    angularFireAuth.authState.subscribe(auth => {
      if(auth){
        // alert("logged in" + auth.displayName);
        this.userData = this.angularFirestore.doc<User>(`users/${auth.uid}`).valueChanges()
        console.log("logged in");
        console.log(auth);
      }else{
        // alert("wylogowano");
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
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
      })
  }

  // Update user data in FireStore
  private updateUserData(uid:string, email:string, displayName:string){
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      roles: {
        customer: true,
      }
    }
    return userRef.set(data, {merge: true});
  }

  getUser(){
    return this.angularFireAuth.currentUser
  }
  

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]) : boolean{
    if (!user) return false

    for (const role of allowedRoles){
      if (user.roles?[role]:Boolean){
        return true
      }
    }
    return false
  }


  canReadDishDetails(user: User):boolean{
    const allowed = ['admin', 'manager','customer']
    return this.checkAuthorization(user,allowed);
  }

  canRead(user: User):boolean {
    const allowed = ['admin', 'manager','customer']
    return this.checkAuthorization(user, allowed);
  }
  canEdit(user: User):boolean {
    const allowed = ['admin', 'manager']
    return this.checkAuthorization(user, allowed);
  }
  canDelete(user: User):boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed);
  }
}
