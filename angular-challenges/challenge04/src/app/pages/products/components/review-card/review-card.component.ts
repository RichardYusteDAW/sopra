import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent {
  @Input() product: Product | null = null;
  @Input() review: Review | null = null;

  /********** PUBLIC **********/
  public generateStarClassArray(rating: number) {
    const starArray = [];
    const maxRating = 5;
    const minRating = 1;

    for (let i = minRating - 1; i < maxRating; i++) {
      if (i < Math.floor(rating)) {
        starArray.push('fa-solid fa-star');
      } else if (i < rating) {
        starArray.push('fa-solid fa-star-half-stroke');
      } else {
        starArray.push('fa-regular fa-star');
      }
    }

    return starArray;
  }
}
