import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Currency } from 'src/app/models/currency';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { CurrencyService } from 'src/app/services/currency.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  id: number;
  dishes: Dish[] = [];

  constructor(private menuService: MenuService, private route: ActivatedRoute, private currencyService: CurrencyService) { 
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDishes();
  }

  ngOnInit(): void {
  }
  getDishes(){
    this.menuService.getDishes().subscribe(item => {
      this.dishes = item;
    });
  }
  showPrice(dish: Dish){
    return this.currencyService.calculatePrice(dish.price);
  }
  updateDish(dish:Dish){
    this.menuService.updateDish(dish)
  }

}
