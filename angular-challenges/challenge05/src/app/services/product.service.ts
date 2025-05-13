import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Productdata } from '../models/productdata';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private URL = 'assets/data.json';
  //private URL = 'https://webhook.site/a0f6c2b7-17d0-487f-9213-4293943eb34b';

  private productData = new BehaviorSubject<Productdata[]>([]);
  productData$ = this.productData.asObservable();

  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get<Productdata[]>(this.URL).subscribe({
      next: (res) => this.productData.next(res),
      error: (res) => console.error('Error fetching data:', res.error),
    });
  }

  addToCart(product: Product) {
    if (!this.isInCart(product.name)) {
      this.cart.push(product);
      this.cartSubject.next(this.cart);
    }
  }

  removeFromCart(product: Product) {
    const index = this.cart.findIndex((item) => item.name === product.name);
    if (index !== -1) this.cart.splice(index, 1);

    this.cartSubject.next(this.cart);
  }

  isInCart(productName: string): boolean {
    return this.cart.some((product) => product.name === productName);
  }
}
