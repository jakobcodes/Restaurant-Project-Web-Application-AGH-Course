import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string = "KAVIOR";
  street: string = "Kawiory";
  building: string = "21";
  telephone: string = "420 420 420";

  constructor() { }

  ngOnInit(): void {
  }

}
