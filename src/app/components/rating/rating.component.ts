import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Dish } from 'src/app/models/dish';
import { Rating } from 'src/app/models/rating';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BasketService } from 'src/app/services/basket.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() dish?: Dish;
  ratingsNumber: number = 0
  avgRating: number = 0
  ratings: Rating[] = []
  dishRate: number = 0


  constructor(
    private ratingService: RatingService,
    private authService: AuthenticationService,
    private basketService: BasketService
  ) {

    this.ratingService.getRatings().subscribe(ratings => {
      this.ratings = ratings;
      this.updateRatingsNumber(),
        this.updateAvg()
    })
  }

  ngOnInit(): void {
  }

  updateRatingsNumber() {
    this.ratingsNumber = this.ratings.filter(rating => rating.dishID == this.dish?.key).length
  }
  updateAvg() {
    let sum = 0
    let counter = 0
    this.ratings.filter(rating => rating.dishID == this.dish?.key)
      .forEach(rating => {
        counter += 1
        sum += rating.rate
      })
    this.avgRating = sum / counter
  }

  changeRate(starID: number) {
    this.ratingService.rate(this.dish!, starID)
    this.authService.isBanned()?.pipe(take(1)).subscribe(res => {
      if (res) alert('user is banned, he cannot rate')
      else if (!this.basketService.userBoughtDish(this.dish!)) alert('user didnt bought dish')
      else if (this.ratingService.isManager) alert('Manager cant rate')
      else this.dishRate = starID
    })
  }


}
