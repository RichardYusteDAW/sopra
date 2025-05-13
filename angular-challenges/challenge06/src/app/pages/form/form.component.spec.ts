import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { FormModule } from './form.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject } from 'rxjs';
import { Productdata } from 'src/app/models/productdata';

describe('FormComponent', () => {
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let productData: BehaviorSubject<Productdata[]>;

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let view: HTMLElement;

  const mockProductData = [
    {
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      currency: 'USD',
      rating: 4,
      favorite: false,
      similarProducts: [],
      reviews: null,
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

  const mockProducts = [
    {
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
      currency: 'USD',
      rating: 4,
      favorite: false,
    },
    {
      name: 'Product 2',
      price: 20,
      description: 'Description 2',
      currency: 'USD',
      rating: 5,
      favorite: true,
    },
  ];

  beforeEach(() => {
    // Mocking Service
    productServiceMock = jasmine.createSpyObj('ProductService', [
      'createProduct',
    ]);

    // Mocking Observable
    productData = new BehaviorSubject<Productdata[]>([]);
    productServiceMock.productData$ = productData.asObservable();

    // Injecting modules and services
    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormModule],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceMock },
      ],
    });

    // Component and view
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should subscribe to productData$ on init', () => {
      // Arrange

      // Act
      productData.next(mockProductData);
      fixture.detectChanges();

      // Assert
      expect(component.products).toEqual(mockProducts);
    });

    describe('Testing createProduct', () => {
      it('should not call createProduct when form is invalid', () => {
        // Arrange
        component.productForm.patchValue({
          name: '',
          price: 10,
          description: 'Description 1',
          favorite: false,
        });

        // Act
        component.createProduct();

        // Assert
        expect(productServiceMock.createProduct).not.toHaveBeenCalled();
        expect(component.formSubmitted).toBe(false);
      });

      it('should call createProduct when form is valid', () => {
        // Arrange
        component.similarProducts = [];
        component.productForm.patchValue({
          name: 'Product 1',
          price: 10,
          description: 'Description 1',
          favorite: false,
        });
        const transformData = {
          name: 'Product 1',
          price: 10,
          description: 'Description 1',
          currency: 'USD',
          rating: 1,
          favorite: false,
          similarProducts: [],
          reviews: null,
        };

        // Act
        component.createProduct();

        // Assert
        expect(productServiceMock.createProduct).toHaveBeenCalledWith(
          transformData
        );
        expect(component.formSubmitted).toBe(true);
      });
    });

    describe('Testing toggleSimiarProducts', () => {
      it('should add product to similarProducts when checked', () => {
        // Arrange
        const product = mockProductData[0];
        const event = { target: { checked: true } } as unknown as Event;

        // Act
        component.toggleSimiarProducts(event, product);

        // Assert
        expect(component.similarProducts).toContain(product);
      });

      it('should remove product from similarProducts when unchecked', () => {
        // Arrange
        const product = mockProductData[0];
        component.similarProducts = [product];
        const event = { target: { checked: false } } as unknown as Event;

        // Act
        component.toggleSimiarProducts(event, product);

        // Assert
        expect(component.similarProducts).not.toContain(product);
      });
    });

    describe('Testing getErrorMessage', () => {
      it('should return null if not formControl', () => {
        // Arrange
        component.productForm = {
          get: () => null,
        } as unknown as FormGroup;
        component.formSubmitted = true;

        // Act
        const result = component.getErrorMessage('name');

        // Assert
        expect(result).toBeNull();
      });

      it('should return null if formControl is not touched', () => {
        // Arrange
        component.productForm = {
          get: () => ({ touched: false, errors: null }),
        } as unknown as FormGroup;

        // Act
        const result = component.getErrorMessage('name');

        // Assert
        expect(result).toBeNull();
      });

      it('should return null if formControl is not valid', () => {
        // Arrange
        component.productForm = {
          get: () => ({ touched: true, errors: null }),
        } as unknown as FormGroup;
        component.formSubmitted = true;

        // Act
        const result = component.getErrorMessage('name');

        // Assert
        expect(result).toBeNull();
      });

      it('should return null if control has no error', () => {
        const control = component.productForm.get('name');
        control?.setErrors(null);
        control?.markAsTouched();

        const result = component.getErrorMessage('name');
        expect(result).toBeNull();
      });

      it('should return required error message', () => {
        // Arrange
        component.formSubmitted = true;
        const control = component.productForm.get('name');
        control?.setErrors({ required: true });
        control?.markAsTouched();

        // Act
        const result = component.getErrorMessage('name');

        // Assert
        expect(result).toEqual('Este campo es obligatorio.');
      });

      it('should return minLength error message', () => {
        // Arrange
        component.formSubmitted = true;
        const control = component.productForm.get('name');
        control?.setErrors({ minlength: { requiredLength: 4 } });
        control?.markAsTouched();

        // Act
        const result = component.getErrorMessage('name');

        // Assert
        expect(result).toEqual('Debe tener al menos 4 caracteres.');
      });

      it('should return maxLength error message', () => {
        // Arrange
        component.formSubmitted = true;
        const control = component.productForm.get('description');
        control?.setErrors({ maxlength: { requiredLength: 350 } });
        control?.markAsTouched();

        // Act
        const result = component.getErrorMessage('description');

        // Assert
        expect(result).toEqual('No puede tener más de 350 caracteres.');
      });

      it('should return min error message', () => {
        // Arrange
        component.formSubmitted = true;
        const control = component.productForm.get('price');
        control?.setErrors({ min: { min: 1 } });
        control?.markAsTouched();

        // Act
        const result = component.getErrorMessage('price');

        // Assert
        expect(result).toEqual('Debe ser mayor o igual a 1.');
      });

      it('should return max error message', () => {
        // Arrange
        component.formSubmitted = true;
        const control = component.productForm.get('price');
        control?.setErrors({ max: { max: 999 } });
        control?.markAsTouched();

        // Act
        const result = component.getErrorMessage('price');

        // Assert
        expect(result).toEqual('Debe ser menor o igual a 999.');
      });

      it('should return specialChars error message', () => {
        // Arrange
        component.formSubmitted = true;
        const control = component.productForm.get('name');
        control?.setErrors({ specialChars: true });
        control?.markAsTouched();

        // Act
        const result = component.getErrorMessage('name');

        // Assert
        expect(result).toEqual('No se permiten caracteres especiales.');
      });
    });
  });

  describe('Testing template', () => {
    it('should have a title', () => {
      // Arrange
      const title = view.querySelector('h1');

      // Act
      // Assert
      expect(title?.textContent).toContain('Create new product');
    });

    it('should show form-confirm when form is submitted', () => {
      // Arrange
      component.formSubmitted = true;
      fixture.detectChanges();

      // Act
      const formConfirm = view.querySelector('app-form-confirm');
      const form = view.querySelector('form');

      // Assert
      expect(formConfirm).toBeTruthy();
      expect(form).toBeFalsy();
    });

    it('should show form when form is not submitted', () => {
      // Arrange
      component.formSubmitted = false;
      fixture.detectChanges();

      // Act
      const formConfirm = view.querySelector('app-form-confirm');
      const form = view.querySelector('form');

      // Assert
      expect(formConfirm).toBeFalsy();
      expect(form).toBeTruthy();
    });

    describe('Testing form', () => {
      it('should render form with name and price inputs', () => {
        // Arrange
        component.formSubmitted = false;
        fixture.detectChanges();

        const form = view.querySelector('form');
        const nameInput = form?.querySelector('input[formControlName="name"]');
        const priceInput = form?.querySelector(
          'input[formControlName="price"]'
        );

        // Act
        // Assert
        expect(form).toBeTruthy();
        expect(nameInput).toBeTruthy();
        expect(priceInput).toBeTruthy();
      });

      it('should update form control when input value changes', () => {
        // Arrange
        component.formSubmitted = false;
        fixture.detectChanges();

        const nameInput = view.querySelector('#name') as HTMLInputElement;
        const priceInput = view.querySelector('#price') as HTMLInputElement;
        nameInput.value = 'Nuevo producto';
        priceInput.value = '100';
        nameInput?.dispatchEvent(new Event('input'));
        priceInput?.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        // Act
        const formControl = component.productForm.get('name')?.value;
        const formControlPrice = component.productForm.get('price')?.value;

        // Assert
        expect(formControl).toBe('Nuevo producto');
        expect(formControlPrice).toBe(100);
      });

      it('should display error message when name is required', () => {
        // Arrange
        component.formSubmitted = false;
        const formControl = component.productForm.get('name');
        formControl?.setErrors({ required: true });
        formControl?.markAsTouched();
        fixture.detectChanges();

        const errorMsg = fixture.nativeElement.querySelector('#name-error');

        // Act
        // Assert
        expect(errorMsg).toBeTruthy();
        expect(errorMsg?.textContent).toContain('Este campo es obligatorio.');
      });

      it('should display error message when price is required', () => {
        // Arrange
        component.formSubmitted = false;
        const formControl = component.productForm.get('price');
        formControl?.setErrors({ required: true });
        formControl?.markAsTouched();
        fixture.detectChanges();

        const errorMsg = fixture.nativeElement.querySelector('#price-error');

        // Act
        // Assert
        expect(errorMsg).toBeTruthy();
        expect(errorMsg?.textContent).toContain('Este campo es obligatorio.');
      });

      it('should display error message when description is required', () => {
        // Arrange
        component.formSubmitted = false;
        const formControl = component.productForm.get('description');
        formControl?.setErrors({ required: true });
        formControl?.markAsTouched();
        fixture.detectChanges();

        const errorMsg =
          fixture.nativeElement.querySelector('#description-error');

        // Act
        // Assert
        expect(errorMsg).toBeTruthy();
        expect(errorMsg?.textContent).toContain('Este campo es obligatorio.');
      });
    });

    it('should have a submit button', () => {
      // Arrange
      const form = view.querySelector('form');
      const submitButton = form?.querySelector('button[type="submit"]');

      // Act
      // Assert
      expect(submitButton).toBeTruthy();
      expect(submitButton?.textContent).toContain('Send');
    });

    it('should call createProduct when submit button is clicked', () => {
      // Arrange
      const form = view.querySelector('form');
      const submitButton = form?.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      spyOn(component, 'createProduct').and.callThrough();

      // Act
      submitButton?.click();
      fixture.detectChanges();

      // Assert
      expect(component.createProduct).toHaveBeenCalled();
    });

    describe('Testing checkbox', () => {
      it('should have the checkbox unchecked', () => {
        // Arrange
        component.products = mockProducts;
        component.similarProducts = [];
        fixture.detectChanges();
        const checkbox = view.querySelector(
          '#similar-product-checkbox'
        ) as HTMLInputElement;

        // Act
        // Assert
        expect(checkbox?.checked).toBe(false);
      });

      it('should check the checkbox checked', () => {
        // Arrange
        component.products = mockProducts;
        component.similarProducts = mockProducts;
        fixture.detectChanges();
        const checkbox = view.querySelector(
          '#similar-product-checkbox'
        ) as HTMLInputElement;

        // Act
        // Assert
        expect(checkbox?.checked).toBe(true);
      });

      it('should call toggleSimiarProducts when checkbox is checked', () => {
        // Arrange
        component.products = mockProducts;
        component.similarProducts = [];
        const product = mockProducts[0];
        fixture.detectChanges();

        const checkbox = view.querySelector(
          '#similar-product-checkbox'
        ) as HTMLInputElement;
        const toggleSimiarProductsSpy = spyOn(
          component,
          'toggleSimiarProducts'
        );

        // Act
        checkbox.click();
        fixture.detectChanges();

        // Assert
        expect(toggleSimiarProductsSpy).toHaveBeenCalledWith(
          jasmine.any(Event),
          product
        );
      });
    });

    it('should render a list of products', () => {
      // Arrange
      component.products = mockProducts;
      fixture.detectChanges();

      // Act
      const productList = view.querySelectorAll('app-similarproduct');

      // Assert
      expect(productList.length).toBe(mockProducts.length);
    });
  });
});
