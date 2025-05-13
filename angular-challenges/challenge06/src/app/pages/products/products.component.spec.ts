import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { ProductsModule } from './products.module';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject, of } from 'rxjs';
import { Productdata } from 'src/app/models/productdata';
import { Product } from 'src/app/models/product';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let view: HTMLElement;

  let mockProductService: ProductService;
  let productData: BehaviorSubject<Productdata[]>;

  let mockProduct: Product;
  let mockProductData: Productdata[];

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'deleteProduct',
      'removeFromCart',
      'isInCart',
    ]);
    productData = new BehaviorSubject<Productdata[]>([]);
    mockProductService.productData$ = productData.asObservable();

    mockProduct = {
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      currency: 'USD',
      rating: 4,
      favorite: false,
    };
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

    TestBed.configureTestingModule({
      imports: [ProductsModule],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load data on init', () => {
      // Arrange

      // Act
      productData.next(mockProductData);

      // Assert
      expect(component.productsData).toEqual(mockProductData);
      expect(component.product).toEqual(mockProduct);
      expect(component.similarProducts).toEqual(
        mockProductData[0].similarProducts
      );
      expect(component.reviews).toEqual(mockProductData[0].reviews!);
    });

    it('should load data on init with empty productData', () => {
      // Arrange
      const mockProductData: Productdata[] = [];

      // Act
      productData.next(mockProductData);

      // Assert
      expect(component.productsData).toEqual(mockProductData);
      expect(component.product).toBeNull();
      expect(component.similarProducts).toEqual([]);
      expect(component.reviews).toEqual([]);
    });

    it('should load data on init with null reviews', () => {
      // Arrange
      mockProductData[0].reviews = null;

      // Act
      productData.next(mockProductData);

      // Assert
      expect(component.productsData).toEqual(mockProductData);
      expect(component.product).toEqual(mockProduct);
      expect(component.similarProducts).toEqual(
        mockProductData[0].similarProducts
      );
      expect(component.reviews).toEqual([]);
    });

    describe('Testing selectProduct', () => {
      it('should return if productsData is empty', () => {
        // Arrange
        component.productsData = [];
        const mockProductData: Productdata[] = [];

        // Act
        component.selectProduct(mockProductData[0]);

        // Assert
        expect(component.product).toBeNull();
        expect(component.similarProducts).toEqual([]);
        expect(component.reviews).toEqual([]);
      });

      it('should select a product with null reviews', () => {
        // Arrange
        component.productsData = mockProductData;
        mockProductData[0].reviews = null;

        // Act
        component.selectProduct(mockProductData[0]);

        // Assert
        expect(component.product).toEqual(mockProductData[0]);
        expect(component.similarProducts).toEqual(
          mockProductData[0].similarProducts
        );
        expect(component.reviews).toEqual([]);
      });

      it('should select a product', () => {
        // Arrange
        component.productsData = mockProductData;

        // Act
        component.selectProduct(mockProductData[0]);

        // Assert
        expect(component.product).toEqual(mockProductData[0]);
        expect(component.similarProducts).toEqual(
          mockProductData[0].similarProducts
        );
        expect(component.reviews).toEqual(mockProductData[0].reviews!);
      });
    });

    describe('Testing toggleFavorite', () => {
      it('should toggle favorite status of a product', () => {
        // Arrange
        component.product = mockProduct;

        // Act
        component.toggleFavorite();
        expect(component.product?.favorite).toBe(true);

        // Assert
        component.toggleFavorite();
        expect(component.product?.favorite).toBe(false);
      });

      it('should not toggle favorite status if product is not found', () => {
        // Arrange
        component.product = null;

        // Act
        component.toggleFavorite();

        // Assert
        expect(component.product).toBeNull();
      });
    });

    it('should delete a product', () => {
      // Arrange
      const productName = 'Product 1';
      component.productsData = mockProductData;

      // Act
      component.deleteProduct(productName);

      // Assert
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(
        productName
      );
    });

    it('should open modal', () => {
      // Arrange
      const product = mockProductData[0];
      const mockDialog = jasmine.createSpyObj('ProductDialogComponent', [
        'openModal',
      ]);
      component.productDialog = mockDialog;

      // Act
      component.openModal(product);

      // Assert
      expect(component.modalProduct).toEqual(product);
      expect(component.productDialog.openModal).toHaveBeenCalled();
    });
  });

  describe('Testing template', () => {
    it('should have app-filters', () => {
      // Arrange
      productData.next(mockProductData);
      fixture.detectChanges();

      // Act
      const filters = view.querySelector('app-filters');

      // Assert
      expect(filters).toBeTruthy();
    });

    it('should show main when produtsData is not empty', () => {
      // Arrange
      productData.next(mockProductData);
      fixture.detectChanges();

      // Act
      const main = view.querySelector('main');

      // Assert
      expect(main).toBeTruthy();
    });

    it('sholuld not show main when productsData is empty', () => {
      // Arrange
      productData.next([]);
      fixture.detectChanges();

      // Act
      const main = view.querySelector('main');

      // Assert
      expect(main).toBeFalsy();
    });

    it('should have app-product', () => {
      // Arrange
      productData.next(mockProductData);
      fixture.detectChanges();

      // Act
      const appProduct = view.querySelector('app-product');

      // Assert
      expect(appProduct).toBeTruthy();
    });

    it('should have all similar products', () => {
      // Arrange
      productData.next(mockProductData);
      const similarProducts = mockProductData[0].similarProducts;
      fixture.detectChanges();

      // Act
      const result = view.querySelectorAll('app-product-card');

      // Assert
      expect(result.length).toEqual(similarProducts.length);
    });

    it('should have all reviews', () => {
      // Arrange
      productData.next(mockProductData);
      const reviews = mockProductData[0].reviews!;
      fixture.detectChanges();

      // Act
      const result = view.querySelectorAll('app-review-card');

      // Assert
      expect(result.length).toEqual(reviews.length);
    });

    it('should render <app-product-dialog>', () => {
      // Arrange
      productData.next(mockProductData);
      fixture.detectChanges();

      // Act
      const dialog = view.querySelector('app-product-dialog');

      // Assert
      expect(dialog).toBeTruthy();
    });
  });
});
