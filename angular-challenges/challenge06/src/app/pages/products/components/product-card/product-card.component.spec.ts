import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { Product } from 'src/app/models/product';
import { StarsComponent } from '../stars/stars.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let view: HTMLElement;
  let mockProduct: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardComponent, StarsComponent],
    });
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;

    mockProduct = {
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      currency: 'USD',
      rating: 4,
      favorite: false,
    };
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('Testing generateStarClassArray', () => {
      it('when rating is 0', () => {
        // Arrange
        const rating = 0;
        const expected = [
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 0.5', () => {
        // Arrange
        const rating = 0.5;
        const expected = [
          'fa-solid fa-star-half-stroke',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 1', () => {
        // Arrange
        const rating = 1;
        const expected = [
          'fa-solid fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 1.5', () => {
        // Arrange
        const rating = 1.5;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star-half-stroke',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 2', () => {
        // Arrange
        const rating = 2;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 2.5', () => {
        // Arrange
        const rating = 2.5;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star-half-stroke',
          'fa-regular fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 3', () => {
        // Arrange
        const rating = 3;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-regular fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 3.5', () => {
        // Arrange
        const rating = 3.5;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star-half-stroke',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 4', () => {
        // Arrange
        const rating = 4;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-regular fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 4.5', () => {
        // Arrange
        const rating = 4.5;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star-half-stroke',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });

      it('when rating is 5', () => {
        // Arrange
        const rating = 5;
        const expected = [
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
          'fa-solid fa-star',
        ];

        // Act
        const result = component.generateStarClassArray(rating);

        // Assert
        expect(result).toEqual(expected);
      });
    });
  });

  describe('Testing template', () => {
    it('should have a card-text div if product is not null', () => {
      // Arrange
      component.product = mockProduct;
      fixture.detectChanges();

      // Act
      const cardTextDiv = view.querySelector('#card-text');

      // Assert
      expect(cardTextDiv).toBeTruthy();
    });

    it('should not have a card-text div if product is null', () => {
      // Arrange
      component.product = null;
      fixture.detectChanges();

      // Act
      const cardTextDiv = view.querySelector('#card-text');

      // Assert
      expect(cardTextDiv).toBeFalsy();
    });

    it('should have a card-text div with the product name', () => {
      // Arrange
      component.product = mockProduct;
      fixture.detectChanges();

      // Act
      const cardTextDiv = view.querySelector('#card-text');

      // Assert
      expect(cardTextDiv?.textContent).toContain(mockProduct.name);
    });

    it('should have an app-stars component', () => {
      // Arrange
      component.product = mockProduct;
      fixture.detectChanges();

      // Act
      const starsComponent = view.querySelector('app-stars');

      // Assert
      expect(starsComponent).toBeTruthy();
    });

    it('should have a card-text div with the product price', () => {
      // Arrange
      component.product = mockProduct;
      fixture.detectChanges();

      // Act
      const cardTextDiv = view.querySelector('#card-text');

      // Assert
      expect(cardTextDiv?.textContent).toContain(mockProduct.price.toString());
    });
  });
});
