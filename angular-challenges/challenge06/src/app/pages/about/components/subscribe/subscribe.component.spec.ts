import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeComponent } from './subscribe.component';

describe('SubscribeComponent', () => {
  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;
  let view: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeComponent],
    });
    fixture = TestBed.createComponent(SubscribeComponent);
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
      const title = view.querySelector('h1');
      expect(title?.textContent).toContain('Subscribe for more info');
    });

    it('should have an input', () => {
      const input = view.querySelector('input');
      expect(input?.type).toBe('email');
    });

    it('should have a button', () => {
      const button = view.querySelector('button');
      expect(button?.textContent).toContain('SUBSCRIBE');
    });

    it('should have message', () => {
      const message = view.querySelector('p');
      expect(message?.textContent).toContain(
        'Subscribe to retrieve updates and join our list'
      );
    });
  });
});
