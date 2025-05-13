import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartModule } from './cart.module';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from 'src/app/models/product';

describe('CartComponent', () => {
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let cartSubject: BehaviorSubject<Product[]>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let view: HTMLElement;

  const mockCart: Product[] = [
    {
      name: 'Producto A',
      price: 10,
      currency: 'USD',
      rating: 4,
      description: '',
      favorite: false,
    },
    {
      name: 'Producto B',
      price: 20,
      currency: 'USD',
      rating: 5,
      description: '',
      favorite: false,
    },
  ];

  beforeEach(() => {
    productServiceMock = jasmine.createSpyObj('ProductService', [
      'removeFromCart',
    ]);
    cartSubject = new BehaviorSubject<Product[]>([]);
    productServiceMock.cart$ = cartSubject.asObservable();

    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [CartModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: MatDialog, useValue: matDialogSpy },
      ],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should subscribe to cart$ on init', () => {
      // Arrange

      // Act
      cartSubject.next(mockCart);
      fixture.detectChanges();

      // Assert
      expect(component.cart).toEqual(mockCart);
    });

    describe('Testing removeFromCart', () => {
      it('should call removeFromCart on productService when dialog result is true', () => {
        // Arrange
        const mockProduct = mockCart[0];
        const dialogRefMock = jasmine.createSpyObj('MatDialogRef', [
          'afterClosed',
        ]);
        dialogRefMock.afterClosed.and.returnValue(of(true));
        matDialogSpy.open.and.returnValue(dialogRefMock);

        // Act
        component.removeFromCart(mockProduct);

        // Assert
        expect(matDialogSpy.open).toHaveBeenCalled();
        expect(productServiceMock.removeFromCart).toHaveBeenCalledWith(
          mockProduct
        );
      });

      it('should not call removeFromCart on productService when dialog result is false', () => {
        // Arrange
        const mockProduct = mockCart[0];
        const dialogRefMock = jasmine.createSpyObj('MatDialogRef', [
          'afterClosed',
        ]);
        dialogRefMock.afterClosed.and.returnValue(of(false));
        matDialogSpy.open.and.returnValue(dialogRefMock);

        // Act
        component.removeFromCart(mockProduct);

        // Assert
        expect(matDialogSpy.open).toHaveBeenCalled();
        expect(productServiceMock.removeFromCart).not.toHaveBeenCalled();
      });
    });
  });

  describe('Testing template', () => {
    it('should have a title', () => {
      // Arrange
      const title = view.querySelector('h3');

      // Act

      // Assert
      expect(title?.textContent).toContain('Carrito de Compras');
    });

    it('should show the cart items', () => {
      // Arrange
      cartSubject.next(mockCart);
      fixture.detectChanges();
      const items = view.querySelectorAll('li');

      // Act

      // Assert
      expect(items.length).toBe(mockCart.length);
    });

    it('should have a button to remove items', () => {
      // Arrange
      cartSubject.next(mockCart);
      fixture.detectChanges();
      const button = view.querySelector('button');

      // Act

      // Assert
      expect(button?.textContent).toContain('Eliminar');
    });

    it('should show div if cart is empty', () => {
      // Arrange
      cartSubject.next([]);
      fixture.detectChanges();
      const emptyCartDiv = view.querySelector('#empty-cart');

      // Act

      // Assert
      expect(emptyCartDiv).toBeTruthy();
    });

    it('should not show div if cart is not empty', () => {
      // Arrange
      cartSubject.next(mockCart);
      fixture.detectChanges();
      const emptyCartDiv = view.querySelector('#empty-cart');

      // Act

      // Assert
      expect(emptyCartDiv).toBeFalsy();
    });
  });
});
