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
  public productData$ = this.productData.asObservable();

  private cart = new BehaviorSubject<Product[]>([]);
  public cart$ = this.cart.asObservable();

  constructor(private http: HttpClient) {
    this.getData();
  }

  createProduct(productData: Productdata) {
    const currentProductData = this.productData.getValue();
    const updatedProductData = [...currentProductData, productData];
    this.productData.next(updatedProductData);
  }

  deleteProduct(name: string) {
    const currentProductData = this.productData.getValue();
    const updatedProductData = currentProductData.filter(
      (product) => product.name !== name
    );
    this.productData.next(updatedProductData);

    const product = currentProductData.find((product) => product.name === name);
    if (product) this.removeFromCart(product);
  }

  addToCart(product: Product) {
    if (!this.isInCart(product.name)) {
      this.cart.next([...this.cart.getValue(), product]);
    }
  }

  removeFromCart(product: Product) {
    this.cart.next(this.cart.getValue().filter((p) => p.name !== product.name));
  }

  isInCart(productName: string): boolean {
    return this.cart.getValue().some((product) => product.name === productName);
  }

  private getData() {
    this.http.get<Productdata[]>(this.URL).subscribe({
      next: (res) => this.productData.next(res),
      error: (res) => console.error('Error fetching data:', res.error),
    });
  }
}
