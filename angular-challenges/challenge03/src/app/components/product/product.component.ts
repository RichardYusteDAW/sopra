import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() toggleFavoriteEvent = new EventEmitter<string>();
  @Output() deleteProductEvent = new EventEmitter<string>();

  /********** PUBLIC **********/
  public toggleFavorite() {
    this.toggleFavoriteEvent.emit(this.product.name);
  }

  public deleteProduct(name: string) {
    this.deleteProductEvent.emit(name);
  }
}
