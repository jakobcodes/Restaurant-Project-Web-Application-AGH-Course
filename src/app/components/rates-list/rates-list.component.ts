import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { Rate } from 'src/app/models/rate';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-rates-list',
  templateUrl: './rates-list.component.html',
  styleUrls: ['./rates-list.component.css']
})
export class RatesListComponent implements OnInit,Observer {

  @Input() dish!: Dish;

  constructor(private rateService: RateService) { 
    this.rateService.attach(this);
  }
  update(): void {
  }

  ngOnInit(): void {
  }

}
