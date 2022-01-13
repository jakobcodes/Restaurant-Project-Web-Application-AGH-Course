import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  dishRate:number = 0;

  constructor() {
   }

  ngOnInit(): void {
  }

  changeRate(starID:number){
    this.dishRate = starID;
  }

}
