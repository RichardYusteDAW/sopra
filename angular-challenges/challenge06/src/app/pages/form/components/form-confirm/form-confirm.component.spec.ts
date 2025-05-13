import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfirmComponent } from './form-confirm.component';

describe('FormConfirmComponent', () => {
  let component: FormConfirmComponent;
  let fixture: ComponentFixture<FormConfirmComponent>;
  let view: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormConfirmComponent],
    });
    fixture = TestBed.createComponent(FormConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call router.navigate with correct arguments', () => {
      // Arrange
      const routerSpy = spyOn(component['router'], 'navigate');

      // Act
      component.navigateToProducts();

      // Assert
      expect(routerSpy).toHaveBeenCalledWith(['/products']);
    });
  });

  describe('Testing template', () => {
    it('should have a success msg', () => {
      // Arrange
      const success = view.querySelector('#success');

      // Act
      // Assert
      expect(success?.textContent).toBe('Save success!');
    });

    it('should have a button', () => {
      // Arrange
      const button = view.querySelector('button');

      // Act
      // Assert
      expect(button?.textContent).toBe('DONE');
    });

    it('should have a button with click event', () => {
      // Arrange
      const button = view.querySelector('button');
      const routerSpy = spyOn(component['router'], 'navigate');

      // Act
      button?.dispatchEvent(new Event('click'));

      // Assert
      expect(routerSpy).toHaveBeenCalledWith(['/products']);
    });
  });
});
