import { Component, OnInit } from '@angular/core';
import { BasketPos } from 'src/app/models/basketPos';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { Subject } from 'src/app/models/subject';
import { BasketService } from 'src/app/services/basket.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit,Observer {

  basket: BasketPos[] = [];
  dishes: Dish[] = []
  sum: number = 0;
  currency: Currency;

  constructor(
    private basketService: BasketService,
    private currencyService: CurrencyService,
    private menuService: MenuService
  ) {
    this.getBasket()
    this.getDishes()

    this.currencyService.attach(this);
    this.currency = this.currencyService.getCurrency();
  }

  //  currency observer
  update(): void {
    this.currency = this.currencyService.getCurrency();
  }

  ngOnInit(): void {
  }

  getBasket() {
    this.basketService.getBasket().subscribe(b => {
      this.basket = b
    })
  }
  getDishes() {
    this.menuService.getDishes().subscribe(dishes => {
      this.dishes = dishes.filter(
        dish => this.basket.filter(bp => bp.quantity > 0)
          .map(bp => bp.dishID)
          .indexOf(dish.key!) !== -1
      )
      this.updateTotalPrice();
    })

  }

  showPrice(dish: Dish) {
    return this.currencyService.calculatePrice(dish.price);
  }

  updateTotalPrice() {
    this.sum = 0;
    this.dishes.forEach(dish => {
      this.sum += (this.currencyService.calculatePrice(dish.price) * this.getBasketQty(dish));
    });
    this.sum = Math.round(((this.sum) + Number.EPSILON) * 100) / 100;
  }

  getBasketQty(dish: Dish) {
    if (dish.key) { return this.basketService.getBasketQty(dish.key!) }
    else return 0
  }
}
