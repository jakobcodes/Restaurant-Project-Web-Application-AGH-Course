import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { Subject } from 'src/app/models/subject';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit,Observer {

  id: number;
  currency: Currency;
  dishes: Dish[] = [];

  constructor(private menuService: MenuService, private route: ActivatedRoute, private currencyService: CurrencyService, private rateService: RateService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDishes();


    this.currency = currencyService.getCurrency();
    this.currencyService.attach(this);
   }

   getDishes(){
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
    });
  }

  update(): void {
    // update currency
    this.currency = this.currencyService.getCurrency();
  }
  showPrice(dish: Dish){
    return this.currencyService.calculatePrice(dish.price);
  }

  ngOnInit(): void {
  }
  increment(dish: Dish){
    this.menuService.incrementBasketQuantity(dish);
  }
  decrement(dish: Dish){
    this.menuService.decrementBasketQuantity(dish);
  }
  removePos(dish: Dish){

  }

}
