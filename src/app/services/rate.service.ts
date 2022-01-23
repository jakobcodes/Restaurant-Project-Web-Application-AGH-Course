import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Dish } from '../models/dish';
import { Observer } from '../models/observer';
import { Rate } from '../models/rate';
import { Subject } from '../models/subject';
import { AuthenticationService } from './authentication.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class RateService implements Subject {

  dishes: Dish[] = [];
  observers: Observer[] = [];

  constructor(private menuService: MenuService, private authService: AuthenticationService) {

  }
  getMenu() {
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
    });
  }
  addRate(dish: Dish, rate: Rate) {
    const isBanned$ = this.authService.isBanned();
    isBanned$?.pipe(take(1)).subscribe(isBan => {
      if(isBan) {
        console.log('user is banned, he cannot add rate')
        return false
      }else{
        this.menuService.addRate(dish, rate);
        return true
      }
    })
  }



//  SUBJECT METHODS
  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log('Subject: Observer has been attached already.');
    }

    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log('Subject: Nonexistent observer.');
    }

    this.observers.splice(observerIndex, 1);
  }

  notify(): void {
    this.observers.forEach((obs) => {
      obs.update(this);
    })
  }
}
