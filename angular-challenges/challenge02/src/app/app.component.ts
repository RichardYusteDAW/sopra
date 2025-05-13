import { Component, ElementRef, ViewChild } from '@angular/core';
import { PRODUCTSDATA } from 'db/products-data';
import { Product } from './models/product';
import { Review } from './models/review';
import { Productdata } from './models/productdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('productDialog') productDialog!: ElementRef<HTMLDialogElement>;

  productsData!: Productdata[];
  product!: Product;
  modalProduct!: Product | null;
  similarProducts: Product[] = [];
  reviews: Review[] = [];
  filteredPrice: boolean = false;
  filteredRating: boolean = false;

  ngOnInit() {
    this.loadData();
  }

  /**********PUBLIC **********/
  public findProductByPosition(position: number) {
    const {
      name,
      price,
      currency,
      rating,
      description,
      similarProducts,
      reviews,
    } = this.productsData[position];
    this.product = { name, price, currency, rating, description };

    this.similarProducts = similarProducts;

    this.reviews = reviews ?? [];
  }

  public findProductByName(name: string) {
    const product = this.productsData.find((prod) => prod.name === name);
    if (product) {
      const { name, price, currency, rating, description } = product;
      this.product = { name, price, currency, rating, description };
      this.similarProducts = product.similarProducts;
      this.reviews = product.reviews ?? [];
    }
  }

  public filterProductPriceLowerThan(price: number) {
    this.productsData = this.productsData.filter((prod) => prod.price < price);
    this.findProductByPosition(0);

    this.filteredPrice = true;
  }

  public filterProductRatingGreaterThan(rating: number) {
    this.removeFilter();
    this.productsData = this.productsData.filter(
      (prod) => prod.rating > rating
    );
    this.findProductByPosition(0);

    this.filteredRating = true;
  }

  public removeFilter() {
    this.filteredPrice = false;
    this.filteredRating = false;
    this.loadData();
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

  public openModal(product: Product) {
    this.modalProduct = product;
    this.productDialog.nativeElement.showModal();
  }

  public closeModal() {
    this.productDialog.nativeElement.close();
  }

  /**********PRIVATE **********/
  private loadData() {
    this.productsData = PRODUCTSDATA;
    this.findProductByPosition(0);
  }
}
