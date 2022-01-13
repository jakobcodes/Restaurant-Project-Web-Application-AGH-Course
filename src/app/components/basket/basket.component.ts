import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { BasketService } from 'src/app/services/basket.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit, Observer {

  basket: Dish[];
  sum: number = 0;
  currency: Currency;
  
  constructor(private basketService: BasketService,private currencyService: CurrencyService) {
    this.basket = this.basketService.getBasket();
    this.basketService.attach(this);
    this.currencyService.attach(this);
    this.currency = this.currencyService.getCurrency();
   }

  ngOnInit(): void {
    this.update();
  }
  

  update(): void {
    // update basket
    this.basket = this.basketService.getBasket();

    // update total price
    this.updateTotalPrice();

    // update currency
    this.currency = this.currencyService.getCurrency();
  }
  showPrice(dish: Dish){
    return this.currencyService.calculatePrice(dish.price);
  }

  updateTotalPrice(){
    this.sum = 0;
    this.basket.forEach(dish => {
      this.sum += (this.currencyService.calculatePrice(dish.price) * dish.basketQuantity);
    });
    this.sum = Math.round(((this.sum)+Number.EPSILON)*100)/100;
  }
}
