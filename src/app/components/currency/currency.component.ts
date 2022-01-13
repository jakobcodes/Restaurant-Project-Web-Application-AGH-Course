import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/currency';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currency: Currency;

  constructor(private currencyService: CurrencyService) { 
    this.currency = this.currencyService.getCurrency();
  }

  ngOnInit(): void {
  }
  changeCurrency(){
    this.currencyService.changeCurrency();
    this.currency = this.currencyService.getCurrency();
  };

}
