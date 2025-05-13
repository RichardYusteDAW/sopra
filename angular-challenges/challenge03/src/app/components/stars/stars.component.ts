import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent {
  @Input() product!: Product;

  /********** PUBLIC **********/
  public generateStarClassArray(rating: number) {
    const starArray = [];
    const maxRating = 5;
    const minRating = 1;
    let className = '';

    if (rating < 3) className = 'text-danger';
    else if (rating < 4) className = 'text-orange';
    else className = 'text-gold';

    for (let i = minRating - 1; i < maxRating; i++) {
      if (i < Math.floor(rating)) {
        starArray.push(`fa-solid fa-star ${className}`);
      } else if (i < rating) {
        starArray.push(`fa-solid fa-star-half-stroke ${className}`);
      } else {
        starArray.push(`fa-regular fa-star ${className}`);
      }
    }

    return starArray;
  }

  public onStarClick(star: number) {
    this.product.rating = star + 1;
  }
}
