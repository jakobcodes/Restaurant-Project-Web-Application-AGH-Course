import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { Subject } from 'src/app/models/subject';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BasketService } from 'src/app/services/basket.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit, Observer {

  id: number;
  currency: Currency;
  dishes: Dish[] = [];

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private authService: AuthenticationService,
    private basketService: BasketService,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDishes();


    this.currency = currencyService.getCurrency();
    this.currencyService.attach(this);
  }

  getDishes() {
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
    });
  }

  update(): void {
    // update currency
    this.currency = this.currencyService.getCurrency();
  }
  showPrice(dish: Dish) {
    return this.currencyService.calculatePrice(dish.price);
  }

  ngOnInit(): void {
  }
  //  NEW BASKET
  addToBasket(dish: Dish) {
    this.authService.authState$.pipe(take(1)).subscribe(user => {
      if(user == null) {
        this.router.navigate(['login'])
      }else{
        this.basketService.addToBasket(dish.key!,user?.uid!)
      }
    })
  }
  removeFromBasket(dish: Dish) {
    this.authService.authState$.pipe(take(1)).subscribe(user => {
      if(user == null) {
        this.router.navigate(['login'])
      }else{
        this.basketService.removeOneFromBasket(dish.key!,user?.uid!)
      }
    })
  }
  getBasketQty(dish: Dish) {
    if (dish.key) { return this.basketService.getBasketQty(dish.key!) }
    else return 0
  }

}
