import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { BehaviorSubject, findIndex, map, of, take } from "rxjs";
import { BasketPos } from "../models/basketPos";
import { Dish } from "../models/dish";
import { Observer } from "../models/observer";
import { Subject } from "../models/subject";
import { User } from "../models/user";
import { AuthenticationService } from "./authentication.service";
import { MenuService } from "./menu.service";
import { UsersService } from "./users.service";

@Injectable()
export class BasketService {
    private observers: Observer[] = []
    basket?: BasketPos[] = []
    userID?: string;

    usersRef: AngularFirestoreCollection<User>;
    basketSubject: BehaviorSubject<BasketPos[]> = new BehaviorSubject<BasketPos[]>(this.basket!)

    constructor(
        private db: AngularFirestore,
        private authService: AuthenticationService,
        private usersService: UsersService
    ) {
        this.usersRef = this.db.collection('users')

        // new basket
        this.authService.authState$.subscribe(user => {
            if (user) {
                this.userID = user.uid
                this.getBasket()
            }
        })
    }
    getBasket() {
        this.usersService.getUsers().subscribe(users => {
            let user = users.filter(user => user.uid == this.userID)
            if (user){
                this.basket = user.pop()?.basket
                if(!this.basket)this.basket = []
            } 
            else this.basket = []
            this.basketSubject.next(this.basket!)
        })
        return this.basketSubject.asObservable();
    }
    // NEW BASKET
    getBasketQty(dishID: string) {
        if(this.userID !== undefined){
            let qty = 0
            if (this.basket && this.basket.filter(e => e.dishID == dishID)[0]) {
                qty = this.basket.filter(e => e.dishID == dishID)[0].quantity
            }  
            return qty
        }
        return 0
        
    }

    addToBasket(dishID: string, userID: string) {
        if(userID && dishID){
            this.usersRef.doc(userID).get().subscribe(user => {
                let basket = user.data()?.basket
                if (basket && basket.find(dish => dish.dishID == dishID)) {
                    let qty = basket.find(dish => dish.dishID == dishID)!.quantity
                    qty++
                    const data = {
                        dishID: dishID,
                        quantity: qty
                    }
                    basket.splice(basket.findIndex(dish => dish.dishID == dishID), 1, data)
                    this.usersRef.doc(userID).update({ basket: basket })
                } else if (basket) {
                    basket.push({ dishID: dishID, quantity: 1 })
                    this.usersRef.doc(userID).update({ basket: basket })
                } else {
                    const basket = [{ dishID: dishID, quantity: 1 }]
                    this.usersRef.doc(userID).update({ basket: basket })
                }
            })
        }
        
    }
    removeOneFromBasket(dishID: string, userID: string) {
        if(userID && dishID){
            this.usersRef.doc(userID).get().subscribe(user => {
                let basket = user.data()?.basket
                if (basket && basket.find(dish => dish.dishID == dishID)) {
                    let qty = basket.find(dish => dish.dishID == dishID)!.quantity
                    if (qty && qty > 0) {
                        qty--
                        const data = {
                            dishID: dishID,
                            quantity: qty
                        }
                        basket.splice(basket.findIndex(dish => dish.dishID == dishID), 1, data)
                        this.usersRef.doc(userID).update({ basket: basket })
                    }
                }
            })
        }
        
    }

    //  check if user reserved dish
  userBoughtDish(dish: Dish):boolean {
    let bp = this.basket!.filter(bp => bp.dishID == dish.key!).pop()
    if (bp && bp.quantity > 0) return true
    return false  
  }
}