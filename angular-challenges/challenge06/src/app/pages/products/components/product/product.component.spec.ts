import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { StarsComponent } from '../stars/stars.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let view: HTMLElement;

  let mockProductService: ProductService;
  let mockProduct: Product;

  beforeEach(() => {
    mockProductService = jasmine.createSpyObj('ProductService', [
      'addToCart',
      'isInCart',
    ]);
    mockProduct = {
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      currency: 'USD',
      rating: 4,
      favorite: false,
    };
    TestBed.configureTestingModule({
      declarations: [ProductComponent, StarsComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call isInCartMethod on ngOnChanges', () => {
      // Arrange
      const isInCartSpy = spyOn(component, 'isInCartMethod');

      // Act
      component.ngOnChanges();

      // Assert
      expect(isInCartSpy).toHaveBeenCalled();
    });

    it('should emit toggleFavoriteEvent on toggleFavorite', () => {
      // Arrange
      const toggleFavoriteSpy = spyOn(component.toggleFavoriteEvent, 'emit');

      // Act
      component.toggleFavorite();

      // Assert
      expect(toggleFavoriteSpy).toHaveBeenCalled();
    });

    it('should emit deleteProductEvent on deleteProduct', () => {
      // Arrange
      component.product = mockProduct;
      const deleteProductSpy = spyOn(component.deleteProductEvent, 'emit');

      // Act
      component.deleteProduct();

      // Assert
      expect(deleteProductSpy).toHaveBeenCalledWith(mockProduct.name);
    });

    it('should call addToCart on addToCart', () => {
      // Arrange
      component.product = mockProduct;

      // Act
      component.addToCart();

      // Assert
      expect(mockProductService.addToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('should call isInCartMethod on addToCart', () => {
      // Arrange
      component.product = mockProduct;

      // Act
      component.addToCart();

      // Assert
      expect(mockProductService.isInCart).toHaveBeenCalledWith(
        mockProduct.name
      );
    });
  });

  describe('Testing template', () => {
    describe('Testing div with class "bg-success"', () => {
      it('should have a div with class "bg-success" if product is in cart', () => {
        // Arrange
        component.product = mockProduct;
        component.isInCart = true;
        fixture.detectChanges();

        // Act
        const productDiv = view.querySelector('#container');

        // Assert
        expect(productDiv?.classList).toContain('bg-success');
      });

      it('should not have a div with class "bg-success" if product is not in cart', () => {
        // Arrange
        component.product = mockProduct;
        component.isInCart = false;
        fixture.detectChanges();

        // Act
        const productDiv = view.querySelector('#container');

        // Assert
        expect(productDiv?.classList).not.toContain('bg-success');
      });
    });

    describe('Testing product-container div', () => {
      it('should have a product-container div if product is not null', () => {
        // Arrange
        component.product = mockProduct;
        fixture.detectChanges();

        // Act
        const productContainer = view.querySelector('#product-container');

        // Assert
        expect(productContainer).toBeTruthy();
      });

      it('should not have a product-container div if product is null', () => {
        // Arrange
        component.product = null;
        fixture.detectChanges();

        // Act
        const productContainer = view.querySelector('#product-container');

        // Assert
        expect(productContainer).toBeFalsy();
      });

      it('should have a product-header div with product name', () => {
        // Arrange
        component.product = mockProduct;
        fixture.detectChanges();

        // Act
        const productHeader = view.querySelector('#product-header h1');

        // Assert
        expect(productHeader?.textContent).toContain(mockProduct.name);
      });

      describe('Testing heart icon', () => {
        it('should have a heart icon with fa-solid text-danger if favorite is TRUE', () => {
          // Arrange
          component.product = mockProduct;
          component.product.favorite = true;
          fixture.detectChanges();

          // Act
          const heartIcon = view.querySelector('i');

          // Assert
          expect(heartIcon?.classList).toContain('fa-solid');
          expect(heartIcon?.classList).toContain('text-danger');
        });

        it('should have a heart icon with fa-regular if favorite is FALSE', () => {
          // Arrange
          component.product = mockProduct;
          component.product.favorite = false;
          fixture.detectChanges();

          // Act
          const heartIcon = view.querySelector('i');

          // Assert
          expect(heartIcon?.classList).toContain('fa-regular');
        });
      });

      it('should have app-stars component', () => {
        // Arrange
        component.product = mockProduct;
        fixture.detectChanges();

        // Act
        const starsComponent = view.querySelector('app-stars');

        // Assert
        expect(starsComponent).toBeTruthy();
      });

      it('should have a product-price h2', () => {
        // Arrange
        component.product = mockProduct;
        fixture.detectChanges();

        // Act
        const productPrice = view.querySelector('#product-container h2');

        // Assert
        expect(productPrice?.textContent).toContain(component.product?.price);
      });

      it('should have a product-description div with product description', () => {
        // Arrange
        component.product = mockProduct;
        fixture.detectChanges();

        // Act
        const productDescription = view.querySelector('p');

        // Assert
        expect(productDescription?.textContent).toContain(
          mockProduct.description
        );
      });

      it('should have a delete button and add to cart button', () => {
        // Arrange
        component.product = mockProduct;
        fixture.detectChanges();

        // Act
        const deleteButton = view.querySelector('#delete-button');
        const addToCartButton = view.querySelector('#add-to-cart-button');

        // Assert
        expect(deleteButton?.textContent?.trim()).toBe('Delete');
        expect(addToCartButton?.textContent?.trim()).toBe('Add to Cart');
      });
    });
  });
});
