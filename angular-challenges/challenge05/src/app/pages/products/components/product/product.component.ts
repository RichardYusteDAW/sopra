import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product: Product | null = null;
  @Output() toggleFavoriteEvent = new EventEmitter<string>();
  @Output() deleteProductEvent = new EventEmitter<string>();
  isInCart: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnChanges() {
    this.isInCartMethod();
  }

  /********** PUBLIC **********/
  public toggleFavorite() {
    this.toggleFavoriteEvent.emit(this.product?.name);
  }

  public deleteProduct() {
    if (this.product) this.deleteProductEvent.emit(this.product.name);
  }

  public addToCart() {
    if (this.product) this.productService.addToCart(this.product);
    this.isInCartMethod();
  }

  public isInCartMethod() {
    if (this.product) {
      this.isInCart = this.productService.isInCart(this.product.name);
    }
  }
}
