import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable, of, take } from 'rxjs';
import { Dish } from '../models/dish';
import { Rate } from '../models/rate';
import { Rating } from '../models/rating';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  ratingRef : AngularFirestoreCollection<Rating>
  ratings: Rating[] = []
  ratingsSubject: BehaviorSubject<Rating[]> = new BehaviorSubject<Rating[]>(this.ratings);

  constructor(private db: AngularFirestore, private authService: AuthenticationService) {
    this.ratingRef = this.db.collection('rating')
    this.getRatings()
  }
  getRatings() {
    this.ratingRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
        ({
          key: c.payload.doc.id,
          userID: c.payload.doc.data().userID,
          dishID: c.payload.doc.data().dishID,
          rate: c.payload.doc.data().rate
        })
        )
      )
    ).subscribe(ratings => {
      this.ratings = ratings;
      this.ratingsSubject.next(this.ratings);
    })
    return this.ratingsSubject.asObservable();
  }

  // adding rating, updating rating
  rate(dish:Dish,rate: number){
    this.authService.userData?.pipe(take(1)).subscribe(user => {
      if(user?.banned) {
        console.log('user is banned, he cannot add rating')
      }else{
        if (this.findRating(dish.key!, user?.uid!)){
          this.ratings.forEach(rating => {
            if (rating.dishID == dish.key && rating.userID == user?.uid){
              const new_rating = {
                key: rating?.key!,
                dishID: rating?.dishID!,
                userID: rating?.userID!,
                rate: rate
              }
              this.ratingRef.doc(new_rating.key).set(new_rating, {merge: true})
            }
          })
        }else{
          const new_rating = {
            dishID: dish.key!,
            userID: user?.uid!,
            rate: rate
          }
          this.addRating(new_rating)
        }
      }
    })
  }
  addRating(rating: Rating){
    this.ratingRef.add({...rating}).then(ratingRef => {
      ratingRef.update({key: ratingRef.id})
    })
  }

  findRating(dishID:string, userID: string) : boolean{
    let flag = false
    this.ratings.forEach(rating => {
      if (rating.dishID == dishID && rating.userID == userID){
        flag = true
      }
    })
    return flag
    // return this.ratings.find(rating => rating.dishID == dishID && rating.userID == userID)
  }
}
