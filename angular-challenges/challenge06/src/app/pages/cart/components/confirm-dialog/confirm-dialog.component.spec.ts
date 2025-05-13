import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let view: HTMLElement;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(() => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { message: '' } },
      ],
    });
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should close the dialog with true when onConfirm is called', () => {
      component.onConfirm();
      expect(matDialogRefSpy.close).toHaveBeenCalledWith(true);
    });

    it('should close the dialog with false when onCancel is called', () => {
      component.onCancel();
      expect(matDialogRefSpy.close).toHaveBeenCalledWith(false);
    });
  });

  describe('Testing template', () => {
    it('should hava a title', () => {
      const title = view.querySelector('h2');
      expect(title?.textContent).toContain('Confirmar acción');
    });

    it('should display the message passed in data', () => {
      component.data = { message: 'Hola cocacola' };
      fixture.detectChanges();
      const p = view.querySelector('p');

      expect(p?.textContent).toContain('Hola cocacola');
    });

    it('should call onCancel when cancel button is clicked', () => {
      const cancelButton = view.querySelector(
        '#cancel-button'
      ) as HTMLButtonElement;
      const onCancelSpy = spyOn(component, 'onCancel');
      cancelButton.click();
      expect(onCancelSpy).toHaveBeenCalled();
    });

    it('should call onConfirm when confirm button is clicked', () => {
      const deleteButton = view.querySelector(
        '#delete-button'
      ) as HTMLButtonElement;
      const onConfirmSpy = spyOn(component, 'onConfirm');
      deleteButton.click();
      expect(onConfirmSpy).toHaveBeenCalled();
    });
  });
});
