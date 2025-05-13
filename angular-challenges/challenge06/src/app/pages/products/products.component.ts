import { Component, ViewChild } from '@angular/core';

import { Productdata } from 'src/app/models/productdata';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @ViewChild('productDialog') productDialog!: ProductDialogComponent;
  productsData: Productdata[] = [];
  product: Product | null = null;
  modalProduct: Product | null = null;
  similarProducts: Product[] = [];
  reviews: Review[] = [];

  constructor(private productService: ProductService) {}

  /********** LIFE CYCLE**********/
  ngOnInit() {
    this.loadData();
  }

  /**********PUBLIC **********/
  public selectProduct(productData: Productdata) {
    if (this.productsData.length === 0) return;

    this.product = productData;
    this.similarProducts = productData.similarProducts;
    this.reviews = productData.reviews ?? [];
  }

  public toggleFavorite() {
    if (this.product) this.product.favorite = !this.product.favorite;
  }

  public deleteProduct(name: string) {
    this.productService.deleteProduct(name);
  }

  public openModal(product: Product) {
    this.modalProduct = product;
    this.productDialog.openModal();
  }

  /**********PRIVATE **********/
  private loadData() {
    this.productService.productData$.subscribe({
      next: (res) => {
        this.productsData = res;
        this.findProductByPosition(0);
      },
      error: (res) => console.error('Error fetching data:', res.error),
    });
  }

  private findProductByPosition(position: number) {
    if (this.productsData.length === 0) return;

    const {
      name,
      price,
      currency,
      rating,
      description,
      favorite,
      similarProducts,
      reviews,
    } = this.productsData[position];
    this.product = { name, price, currency, rating, description, favorite };

    this.similarProducts = similarProducts;

    this.reviews = reviews ?? [];
  }
}
