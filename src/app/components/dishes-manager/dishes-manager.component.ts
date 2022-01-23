import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { Subject } from 'src/app/models/subject';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-dishes-manager',
  templateUrl: './dishes-manager.component.html',
  styleUrls: ['./dishes-manager.component.css']
})
export class DishesManagerComponent implements OnInit,Observer {

  dishes: Dish[] = [];
  currency: Currency;

  constructor(
    private menuService: MenuService,
    private currencyService: CurrencyService,
    private router: Router
  ) {

    this.currencyService.attach(this)
    this.currency = currencyService.getCurrency();
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
    });
  }
  update(): void {
    this.currency = this.currencyService.getCurrency()
  }

  ngOnInit(): void {
  }

  goToDetails(id: number) {
    this.router.navigate(['/dishes-manager', id])
  }
  removePos(dish: Dish) {
    this.menuService.removeDish(dish);
  }
  showPrice(dish: Dish) {
    return this.currencyService.calculatePrice(dish.price);
  }
}
