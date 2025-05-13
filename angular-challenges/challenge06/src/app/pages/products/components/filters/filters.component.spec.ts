import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { Productdata } from 'src/app/models/productdata';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let view: HTMLElement;

  let mockProductData: Productdata[];

  beforeEach(() => {
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
        price: 2001,
        description: 'Description 2',
        currency: 'USD',
        rating: 5,
        favorite: true,
        similarProducts: [],
        reviews: null,
      },
    ];

    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default values', () => {
      // Arrange
      component.productsData = mockProductData;

      // Act
      component.ngOnInit();

      // Assert
      expect(component.filteredProducts).toEqual(mockProductData);
      expect(component.maximumPrice).toEqual(2000);
      expect(component.minimumRating).toEqual(4);
      expect(component.filteredPrice).toEqual(false);
      expect(component.filteredRating).toEqual(false);
    });

    describe('Testing applyFilters', () => {
      it('should apply filters on changes if filteredPrice is TRUE', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        component.filteredPrice = true;
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        component.ngOnChanges();

        // Assert
        expect(component.filteredProducts).toEqual([mockProductData[0]]);
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          component.filteredProducts[0]
        );
      });

      it('should apply filters on changes if filteredRating is TRUE', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        component.filteredPrice = false;
        component.filteredRating = true;
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        component.ngOnChanges();

        // Assert
        expect(component.filteredProducts).toEqual([mockProductData[1]]);
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          component.filteredProducts[0]
        );
      });
    });

    describe('Testing onFilterPriceLowerThan', () => {
      it('should filter products by price if filteredPrice is FALSE', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        component.filteredPrice = false;
        component.filteredRating = false;
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        component.onFilterPriceLowerThan(2000);

        // Assert
        expect(component.filteredProducts).toEqual([mockProductData[0]]);
        expect(component.filteredRating).toEqual(false);
        expect(component.filteredPrice).toEqual(true);
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          component.filteredProducts[0]
        );
      });

      it('should not filter products by price if filteredPrice is TRUE', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        component.filteredPrice = true;
        component.filteredRating = false;
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        component.onFilterPriceLowerThan(2000);

        // Assert
        expect(component.filteredProducts).toEqual(mockProductData);
        expect(component.filteredRating).toEqual(false);
        expect(component.filteredPrice).toEqual(false);
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          component.filteredProducts[0]
        );
      });
    });

    describe('Testing onFilterRatingGreaterThan', () => {
      it('should filter products by rating if filteredRating is FALSE', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        component.filteredPrice = false;
        component.filteredRating = false;
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        component.onFilterRatingGreaterThan(4);

        // Assert
        expect(component.filteredProducts).toEqual([mockProductData[1]]);
        expect(component.filteredPrice).toEqual(false);
        expect(component.filteredRating).toEqual(true);
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          component.filteredProducts[0]
        );
      });

      it('should not filter products by rating if filteredRating is TRUE', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        component.filteredPrice = false;
        component.filteredRating = true;
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        component.onFilterRatingGreaterThan(4);

        // Assert
        expect(component.filteredProducts).toEqual(mockProductData);
        expect(component.filteredPrice).toEqual(false);
        expect(component.filteredRating).toEqual(false);
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          component.filteredProducts[0]
        );
      });
    });

    describe('Testing onRemoveFilter', () => {
      it('should not remove filters if filterPrice is FALSE or filterdRating is FALSE', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();

        // Act
        component.onRemoveFilter();

        // Assert
        expect(component.filteredProducts).toEqual(mockProductData);
      });

      it('should remove filters and reset filteredProducts', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        component.filteredPrice = true;
        component.ngOnChanges();
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        expect(component.filteredProducts).not.toEqual(mockProductData);
        component.onRemoveFilter();

        // Assert
        expect(component.filteredProducts).toEqual(mockProductData);
        expect(component.filteredPrice).toEqual(false);
        expect(component.filteredRating).toEqual(false);
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          component.filteredProducts[0]
        );
      });

      it('should emit selected product when a product is selected', () => {
        // Arrange
        component.productsData = mockProductData;
        component.ngOnInit();
        const selectedProductEventSpy = spyOn(
          component.selectedProductEvent,
          'emit'
        );

        // Act
        component.onSelectProduct(mockProductData[0]);

        // Assert
        expect(selectedProductEventSpy).toHaveBeenCalledWith(
          mockProductData[0]
        );
      });
    });
  });

  describe('Testing template', () => {
    describe('Testing filter by price button', () => {
      it('should have class btn-secondary when filteredPrice is true', () => {
        // Arrange
        component.filteredPrice = true;
        fixture.detectChanges();

        // Act
        const button = view.querySelector('#filter-price-button');

        // Assert
        expect(button!.textContent?.trim()).toBe('Filter: (Price < $2000)');
        expect(button!.classList).toContain('btn-secondary');
        expect(button!.classList).not.toContain('btn-success');
      });

      it('should have class btn-success when filteredPrice is false', () => {
        // Arrange
        component.filteredPrice = false;
        fixture.detectChanges();

        // Act
        const button = view.querySelector('#filter-price-button');

        // Assert
        expect(button!.textContent?.trim()).toBe('Filter: (Price < $2000)');
        expect(button!.classList).toContain('btn-success');
        expect(button!.classList).not.toContain('btn-secondary');
      });
    });

    describe('Testing filter by rating button', () => {
      it('should have class btn-secondary when filteredRating is true', () => {
        // Arrange
        component.filteredRating = true;
        fixture.detectChanges();

        // Act
        const button = view.querySelector('#filter-rating-button');

        // Assert
        expect(button!.textContent?.trim()).toBe('Filter: (Rating > 4)');
        expect(button!.classList).toContain('btn-secondary');
        expect(button!.classList).not.toContain('btn-success');
      });

      it('should have class btn-success when filteredRating is false', () => {
        // Arrange
        component.filteredRating = false;
        fixture.detectChanges();

        // Act
        const button = view.querySelector('#filter-rating-button');

        // Assert
        expect(button!.textContent?.trim()).toBe('Filter: (Rating > 4)');
        expect(button!.classList).toContain('btn-success');
        expect(button!.classList).not.toContain('btn-secondary');
      });
    });

    it('should have reset filter button', () => {
      // Arrange
      component.filteredPrice = true;
      component.filteredRating = false;
      fixture.detectChanges();

      // Act
      const button = view.querySelector('#reset-filter-button');

      // Assert
      expect(button?.textContent?.trim()).toBe('Reset Filter');
    });

    it('should have all li', () => {
      // Arrange
      component.productsData = mockProductData;
      component.ngOnInit();
      fixture.detectChanges();

      // Act
      const liElements = view.querySelectorAll('li');

      // Assert
      expect(liElements.length).toBe(mockProductData.length);
      expect(liElements[0].textContent?.trim()).toBe(
        mockProductData[0].name + '>'
      );
      expect(liElements[1].textContent?.trim()).toBe(
        mockProductData[1].name + '>'
      );
    });
  });
});
