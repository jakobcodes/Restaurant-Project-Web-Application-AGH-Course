import { Injectable } from '@angular/core';
import { Currency } from '../models/currency';
import { Observer } from '../models/observer';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService implements Subject {

  currency: Currency = Currency.EUR;
  private observers: Observer[] = [];

  constructor() { }

  getCurrency(){
    return this.currency;
  }

  changeCurrency(){
    if (this.currency === Currency.EUR){
      this.currency = Currency.USD;
    }else{
      this.currency = Currency.EUR
    }
    this.notify();
  };

  calculatePrice(price: number){
    if(this.currency === Currency.USD){
      return Math.round(((price*1.25)+Number.EPSILON)*100)/100;
    }else{
      return price;
    }
  }

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
