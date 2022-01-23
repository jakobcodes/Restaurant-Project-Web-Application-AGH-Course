import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, of } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = []
  usersRef: AngularFirestoreCollection<User>;
  usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  constructor(private db: AngularFirestore, private authService: AuthenticationService) {
    this.usersRef = this.db.collection('users');
  }

  getUsers() {
    this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          uid: c.payload.doc.id,
          displayName: c.payload.doc.data().displayName,
          email: c.payload.doc.data().email,
          roles: c.payload.doc.data().roles,
          banned: c.payload.doc.data().banned,
          basket: c.payload.doc.data().basket
        })))
    ).subscribe(users => {
      this.users = users;
      this.usersSubject.next(this.users)
    })
    return this.usersSubject.asObservable();
  }

  banUser(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    user.banned = true;
    return userRef.set(user, { merge: true })
  }
  unbanUser(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    user.banned = false;
    return userRef.set(user, { merge: true })
  }
  changeRole(user: User, role: string) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    if (role == 'admin') {
      if (user.roles.admin) user.roles.admin = false
      else user.roles.admin = true
    } else if (role == 'manager') {
      if (user.roles.manager) user.roles.manager = false
      else user.roles.manager = true
    }
    return userRef.set(user, { merge: true })


  }
}
