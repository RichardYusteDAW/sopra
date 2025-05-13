import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product | null = null;
  similarProducts: Product[] = [];
  modalProduct: Product | null = null;

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
