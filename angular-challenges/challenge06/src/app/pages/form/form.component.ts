import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { noSpecialCharsValidator } from 'src/app/validators/no-special-chars.validator';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  private readonly minLength = 4;
  private readonly maxLength = 350;
  private readonly minPrice = 1;
  private readonly maxPrice = 999;

  public formSubmitted = false;
  public products: Product[] = [];
  public similarProducts: Product[] = [];

  public productForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(this.minLength)]],
    price: [
      null,
      [
        Validators.required,
        Validators.min(this.minPrice),
        Validators.max(this.maxPrice),
      ],
    ],
    description: [
      null,
      [
        Validators.required,
        Validators.maxLength(this.maxLength),
        noSpecialCharsValidator(),
      ],
    ],
    favorite: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  public createProduct() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.transformToProductData());
      this.formSubmitted = true;
    }
  }

  public toggleSimiarProducts(event: Event, product: Product) {
    const { checked } = event.target as HTMLInputElement;

    if (checked) {
      this.similarProducts.push(product);
    } else {
      this.similarProducts = this.similarProducts.filter(
        (prod) => prod.name !== product.name
      );
    }
  }

  public getErrorMessage(formControlName: string) {
    const errorMessages: { [key: string]: string } = {
      required: 'Este campo es obligatorio.',
      minlength: `Debe tener al menos ${this.minLength} caracteres.`,
      maxlength: `No puede tener más de ${this.maxLength} caracteres.`,
      min: `Debe ser mayor o igual a ${this.minPrice}.`,
      max: `Debe ser menor o igual a ${this.maxPrice}.`,
      specialChars: 'No se permiten caracteres especiales.',
    };

    const formControl = this.productForm.get(formControlName);
    if (formControl && formControl.errors && formControl.touched) {
      for (const error in formControl.errors) {
        if (errorMessages[error]) return errorMessages[error];
      }
    }

    return null;
  }

  private getProducts() {
    this.productService.productData$.subscribe({
      next: (res) => {
        this.products = res.map((product) => ({
          name: product.name,
          price: product.price,
          description: product.description,
          currency: product.currency,
          rating: product.rating,
          favorite: product.favorite,
        }));
      },
      error: (err) => console.error('Error fetching  products:', err),
    });
  }

  private transformToProductData() {
    const { name, price, description, favorite } = this.productForm.value;
    return {
      name,
      price,
      description,
      currency: 'USD',
      rating: 1,
      favorite,
      similarProducts: this.similarProducts,
      reviews: null,
    };
  }
}
