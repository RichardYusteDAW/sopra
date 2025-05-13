import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
})
export class ProductDialogComponent {
  @ViewChild('productDialog') productDialog!: ElementRef<HTMLDialogElement>;
  @Input() modalProduct!: Product | null;

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

  public openModal() {
    this.productDialog.nativeElement.showModal();
  }

  public closeModal() {
    this.productDialog.nativeElement.close();
  }
}
