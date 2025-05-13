import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent {
  @Input() product: Product | null = null;

  /********** PUBLIC **********/
  public generateStarClassArray(rating: number) {
    const starArray = [];
    const maxRating = 5;
    const textColorMap: { [key: number]: string } = {
      1: 'text-danger',
      2: 'text-danger',
      3: 'text-orange',
      4: 'text-gold',
      5: 'text-gold',
    };
    let colorClass = textColorMap[Math.floor(rating)];

    for (let i = 0; i < maxRating; i++) {
      let starClass = '';

      if (i < Math.floor(rating)) starClass = 'fa-solid fa-star';
      else if (i < rating) starClass = 'fa-solid fa-star-half-stroke';
      else starClass = 'fa-regular fa-star';

      starArray.push(`${starClass} ${colorClass}`);
    }

    return starArray;
  }

  public onStarClick(star: number) {
    if (!this.product) return;
    this.product.rating = star + 1;
  }
}
