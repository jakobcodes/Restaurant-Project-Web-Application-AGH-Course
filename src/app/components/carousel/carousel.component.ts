  import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() images: String[]= [];
  displayedImage:String = this.images[0];
  index:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.displayedImage = this.images[this.index];
  }

  slideRight(){
    if(this.index < this.images.length - 1){
      this.index++;
    }
    this.displayedImage = this.images[this.index];
  }
  slideLeft(){
    if(this.index > 0){
      this.index--;
    }
    this.displayedImage = this.images[this.index];
  }

}
