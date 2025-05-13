import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Productdata } from '../models/productdata';
import { Product } from '../models/product';

fdescribe('ProductService', () => {
  const URL = 'assets/data.json';
  let service: ProductService;
  let mockHttpClient: HttpTestingController;
  let mockProductData: Productdata[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    mockHttpClient = TestBed.inject(HttpTestingController);

    mockProductData = [
      {
        name: 'Product 1',
        price: 10,
        description: 'Description 1',
        currency: 'USD',
        rating: 4,
        favorite: false,
        similarProducts: [
          {
            name: 'Similar Product 1',
            price: 15,
            description: 'Similar Description 1',
            currency: 'USD',
            rating: 4,
            favorite: false,
          },
        ],
        reviews: [
          {
            image: 'image1.jpg',
            name: 'User 1',
            rating: 4,
            opinion: 'Great product!',
            date: '2023-10-01',
          },
          {
            image: 'image2.jpg',
            name: 'User 2',
            rating: 5,
            opinion: 'Excellent quality!',
            date: '2023-10-02',
          },
        ],
      },
      {
        name: 'Product 2',
        price: 20,
        description: 'Description 2',
        currency: 'USD',
        rating: 5,
        favorite: true,
        similarProducts: [],
        reviews: null,
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData on initialization', () => {
    // Arrange
    const req = mockHttpClient.expectOne(URL);
    req.flush(mockProductData);
    let data: Productdata[] = [];

    // Act
    service.productData$.subscribe((response) => {
      data = response;
    });

    // Assert
    expect(data).toEqual(mockProductData);
  });

  it('should create a product', () => {
    // Arrange
    const newProduct: Productdata = {
      name: 'Product 3',
      price: 30,
      description: 'Description 3',
      currency: 'USD',
      rating: 3,
      favorite: false,
      similarProducts: [],
      reviews: null,
    };
    let data: Productdata[] = [];

    // Act
    service.createProduct(newProduct);
    service.productData$.subscribe((res) => (data = res));

    // Assert
    expect(data).toContain(newProduct);
  });

  it('should delete a product', () => {
    // Arrange
    const req = mockHttpClient.expectOne(URL);
    req.flush(mockProductData);
    const productToDelete = mockProductData[1];
    let data: Productdata[] = [];
    let cart: Product[] = [];

    // Act
    service.addToCart(productToDelete);
    service.cart$.subscribe((res) => (cart = res));
    expect(cart).toContain(productToDelete);
    service.deleteProduct(productToDelete.name);
    service.productData$.subscribe((res) => (data = res));

    // Assert
    expect(data).not.toContain(productToDelete);
    expect(cart).not.toContain(productToDelete);
  });

  it('should add a product to the cart', () => {
    // Arrange
    const productToAdd = mockProductData[0];
    let cart: Product[] = [];

    // Act
    expect(cart).not.toContain(productToAdd);
    service.addToCart(productToAdd);
    service.cart$.subscribe((res) => (cart = res));

    // Assert
    expect(cart).toContain(productToAdd);
  });

  it('should remove a product from the cart', () => {
    // Arrange
    const req = mockHttpClient.expectOne(URL);
    req.flush(mockProductData);
    const productToRemove = mockProductData[0];
    let cart: Product[] = [];

    // Act
    service.addToCart(productToRemove);
    service.cart$.subscribe((res) => (cart = res));
    expect(cart).toContain(productToRemove);
    service.removeFromCart(productToRemove);

    // Assert
    expect(cart).not.toContain(productToRemove);
  });

  it('should check if a product is in the cart', () => {
    // Arrange
    const req = mockHttpClient.expectOne(URL);
    req.flush(mockProductData);
    const productToCheck = mockProductData[0];

    // Act
    expect(service.isInCart(productToCheck.name)).toBeFalse();
    service.addToCart(productToCheck);

    // Assert
    expect(service.isInCart(productToCheck.name)).toBeTrue();
  });
});
