import { Injectable } from '@angular/core';
import { Dish } from '../models/dish';
import { Rate } from '../models/rate';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  dishes: Dish[] = [];

  dishesRef: AngularFirestoreCollection<Dish>;
  dishesSubject: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(this.dishes);

  constructor(private db: AngularFirestore, private authService: AuthenticationService) {
    this.dishesRef = this.db.collection('dishes');
  }

  getDishes() {
    this.dishesRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
        ({
          key: c.payload.doc.id,
          name: c.payload.doc.data().name,
          type: c.payload.doc.data().type,
          category: c.payload.doc.data().category,
          ingredients: c.payload.doc.data().ingredients,
          maxPositions: c.payload.doc.data().maxPositions,
          price: c.payload.doc.data().price,
          description: c.payload.doc.data().description,
          images: c.payload.doc.data().images,
          basketQuantity: c.payload.doc.data().basketQuantity,
          rates: c.payload.doc.data().rates
        })
        )
      )
    ).subscribe(dishes => {
      this.dishes = dishes;
      this.dishesSubject.next(this.dishes);
    })
    return this.dishesSubject.asObservable();
  }

  incrementBasketQuantity(dish: Dish) {

    if (dish.basketQuantity < dish.maxPositions) {
      dish.basketQuantity++;
      this.dishesRef.doc(dish.key).update({ basketQuantity: dish.basketQuantity })
    }
  }

  decrementBasketQuantity(dish: Dish) {
    if (dish.basketQuantity > 0) {
      dish.basketQuantity--;
      this.dishesRef.doc(dish.key).update({ basketQuantity: dish.basketQuantity });
    }
  }
  //  DISH RATE AND RATING
  addRate(dish: Dish, rate: Rate) {
    dish.rates.push(rate);
    this.dishesRef.doc(dish.key).set(dish, { merge: true });
  }
  // addRating(dish:Dish,rate: Rate){
  //   this.authService.userData?.pipe(take(1)).subscribe(user => {
  //     const uid = user?.uid
  //     dish.rating?.forEach(e => {
  //       if (e)
  //     })
  //   })


    
  //   dish.rates.push(rate);
  //   this.dishesRef.doc(dish.key).set(dish, { merge: true });
  // }


  addDish(dish: Dish) {
    this.dishesRef.add({ ...dish }).then(dishRef => {
      dishRef.update({key: dishRef.id})
    });
  }

  removeDish(dish: Dish) {
    this.dishesRef.doc(dish.key).delete();
  }

  updateDish(dish: Dish) {
    const dishRef: AngularFirestoreDocument<Dish> = this.db.doc(`dishes/${dish.key}`);

    return dishRef.set(dish, { merge: true })
  }

}
