import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit,Observer {

  dishes: Dish[] = [];
  maxPrice:number = 0;
  minPrice:number = 0;
  currency: Currency;
  reservedPositions: number = 0;

  constructor(private menuService: MenuService, private currencyService: CurrencyService, private router: Router) {
    this.currencyService.attach(this);
    this.currency = currencyService.getCurrency();
    this.getMenu();
    this.countReservedPositions();
   }

  ngOnInit(): void {
    this.getMenu();
    if(this.dishes.length > 0){
      this.maxPrice = this.dishes[0].price;
      this.minPrice = this.dishes[0].price;
    }

    this.countReservedPositions();
    this.countMaxAndMinPrices();
  }
  getMenu(){
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
      this.countReservedPositions();
      this.countMaxAndMinPrices();
    });
    
  }

  update(): void {
    this.currency = this.currencyService.getCurrency();
  }
  
  showPrice(dish: Dish){
    return this.currencyService.calculatePrice(dish.price);
  }

  countReservedPositions(){
    this.reservedPositions = 0;
    this.dishes.forEach((pos) =>{
      this.reservedPositions += pos.basketQuantity;
    })
  }

  increment(dish: Dish){
    this.menuService.incrementBasketQuantity(dish);
    this.countReservedPositions();
  }
  decrement(dish: Dish){
    this.menuService.decrementBasketQuantity(dish);
    this.countReservedPositions();
  }
  countMaxAndMinPrices(){
    if(this.dishes.length > 0){
      this.maxPrice = this.dishes[0].price;
      this.minPrice = this.dishes[0].price;
      this.dishes.forEach((dish) => {
        if(dish.price > this.maxPrice) this.maxPrice = dish.price;
        if(dish.price < this.minPrice) this.minPrice = dish.price;
      })
    }
    
  }
  receiveDish($event:Dish){
    this.dishes.push($event);
  }
  goToDetails(id: number){
    this.router.navigate(['/menu', id])
  }
}
