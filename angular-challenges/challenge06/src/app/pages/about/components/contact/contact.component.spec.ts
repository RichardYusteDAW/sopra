import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let view: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactComponent],
    });
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing the component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Testing the template', () => {
    it('should have a title', () => {
      const title = view.querySelector('h2');
      expect(title?.textContent).toContain('Needs more info');
    });

    it('should have a subtitle', () => {
      const subtitle = view.querySelector('p');
      expect(subtitle?.textContent).toContain(
        'Send me an email to get more info aobut products'
      );
    });

    it('should have a submit button', () => {
      const button = view.querySelector('button');
      expect(button).toBeTruthy();
    });
  });
});
