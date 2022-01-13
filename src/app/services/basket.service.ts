import { Injectable } from "@angular/core";
import { Dish } from "../models/dish";
import { Observer } from "../models/observer";
import { Subject } from "../models/subject";
import { MenuService } from "./menu.service";

@Injectable()
export class BasketService implements Subject{
    private observers: Observer[] = []
    basket: Dish[] = [];
    dishes: Dish[] = [];

    constructor(private menuService: MenuService){
        this.getDishes();
    }

    getBasket(){
        this.basket = [];
        this.dishes.forEach(dish => {
            if(dish.basketQuantity > 0){
                this.basket.push(dish);
            }
        });
        return this.basket;
    }

    getDishes(){
        this.menuService.getDishes().subscribe(item => {
            this.dishes = item;
            this.notify();
        });
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