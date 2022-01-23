import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BasketService } from 'src/app/services/basket.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit, Observer {

  dishes: Dish[] = [];
  maxPrice: number = 0;
  minPrice: number = 0;
  currency: Currency;
  reservedPositions: number = 0;

  constructor(
      private menuService: MenuService,
      private currencyService: CurrencyService,
      private router: Router,
      private authService: AuthenticationService,
      private basketService: BasketService
    ) {
    this.currencyService.attach(this);
    this.currency = currencyService.getCurrency();
    this.getMenu();
    this.countReservedPositions();
  }

  ngOnInit(): void {
    this.getMenu();
    if (this.dishes.length > 0) {
      this.maxPrice = this.dishes[0].price;
      this.minPrice = this.dishes[0].price;
    }

    this.countReservedPositions();
    this.countMaxAndMinPrices();
  }
  getMenu() {
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
      this.countReservedPositions();
      this.countMaxAndMinPrices();
    });

  }

  update(): void {
    this.currency = this.currencyService.getCurrency();
  }

  showPrice(dish: Dish) {
    return this.currencyService.calculatePrice(dish.price);
  }

  countReservedPositions() {
    this.basketService.getBasket().subscribe(res => {
      this.reservedPositions = 0
      if(res){
        res.forEach(e => {
          this.reservedPositions += e.quantity
        })
      }
    })
  }
  countMaxAndMinPrices() {
    if (this.dishes.length > 0) {
      this.maxPrice = this.dishes[0].price;
      this.minPrice = this.dishes[0].price;
      this.dishes.forEach((dish) => {
        if (dish.price > this.maxPrice) this.maxPrice = dish.price;
        if (dish.price < this.minPrice) this.minPrice = dish.price;
      })
    }

  }
  goToDetails(id: number) {
    this.router.navigate(['/menu', id])
  }

  //  NEW ONLINE BASKET
  addToBasket(dish: Dish){
    this.authService.authState$.pipe(take(1)).subscribe(user => {
      if(user == null) {
        this.router.navigate(['login'])
      }else{
        this.basketService.addToBasket(dish.key!,user?.uid!)
      }
    })
  }
  removeFromBasket(dish: Dish){
    this.authService.authState$.pipe(take(1)).subscribe(user => {
      if(user == null) {
        this.router.navigate(['login'])
      }else{
        this.basketService.removeOneFromBasket(dish.key!,user?.uid!)
      }
    })
  }
  getBasketQty(dish: Dish){
    if(dish.key){return this.basketService.getBasketQty(dish.key!)}
    else return 0
  }

}
