import { Component, ViewChild } from '@angular/core';

import { PRODUCTSDATA } from 'db/products-data';
import { Productdata } from 'src/app/models/productdata';
import { Product } from 'src/app/models/product';
import { Review } from 'src/app/models/review';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';

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

  /********** LIFE CYCLE**********/
  ngOnInit() {
    this.loadData();
  }

  /**********PUBLIC **********/
  public selectProduct(productData: Productdata) {
    const { name, price, currency, rating, description, favorite } =
      productData;
    this.product = { name, price, currency, rating, description, favorite };
    //this.product = productData;
    this.similarProducts = productData.similarProducts;
    this.reviews = productData.reviews ?? [];
  }

  public toggleFavorite(productname: string) {
    const product = this.productsData.find((prod) => prod.name === productname);
    if (product) {
      product.favorite = !product.favorite;
      this.product = product;
    }
  }

  public deleteProduct(name: string) {
    this.productsData = this.productsData.filter((prod) => prod.name !== name);
    if (this.productsData.length === 0) {
      this.product = {} as Product;
      this.similarProducts = [];
      this.reviews = [];
    }
    this.findProductByPosition(0);
  }

  public openModal(product: Product) {
    this.modalProduct = product;
    this.productDialog.openModal();
  }

  /**********PRIVATE **********/
  private loadData() {
    this.productsData = PRODUCTSDATA;
    this.findProductByPosition(0);
  }

  public findProductByPosition(position: number) {
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
