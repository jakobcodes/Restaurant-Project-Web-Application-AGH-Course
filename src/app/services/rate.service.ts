import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { BasketPos } from '../models/basketPos';
import { Dish } from '../models/dish';
import { Observer } from '../models/observer';
import { Rate } from '../models/rate';
import { Subject } from '../models/subject';
import { AuthenticationService } from './authentication.service';
import { BasketService } from './basket.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  dishes: Dish[] = [];
  observers: Observer[] = [];

  constructor(
    private menuService: MenuService,
    private authService: AuthenticationService,
    private basketService: BasketService
  ) {

  }
  getMenu() {
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
    });
  }
  addRate(dish: Dish, rate: Rate) {
    const isBanned$ = this.authService.isBanned();
    isBanned$?.pipe(take(1)).subscribe(isBan => {
      if (isBan) {
        alert('user is banned, he cannot add rate')
        console.log('user is banned, he cannot add rate')
      } else if (!this.basketService.userBoughtDish(dish)){
        alert('user didnt reserve dish')
        console.log('user didnt reserve dish')
      }else{
        this.menuService.addRate(dish, rate);
      }
    })
  }
  //  check if user reserved dish
  userBoughtDish(dish: Dish):boolean {
    let bp: BasketPos | undefined;
    this.basketService.getBasket().pipe(take(1)).subscribe(basket => {
      bp = basket.filter(bp => bp.dishID == dish.key!).pop()
    })
    if (bp && bp.quantity > 0) return true
    return false  
  }
}
