import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutComponent } from './about.component';
import { AboutModule } from './about.module';
import { DESCRIPTIONS } from 'db/descriptions';

describe('AboutComponent', () => {
  let fixture: ComponentFixture<AboutComponent>;
  let component: AboutComponent;
  let view: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AboutModule],
    });
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing the component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load descriptions on init', () => {
      expect(component.descriptions).toEqual(DESCRIPTIONS);
    });
  });

  describe('Testing the template', () => {
    it('should include app-subscribe components', () => {
      expect(view.querySelector('app-subscribe')).toBeTruthy();
    });

    it('should render the title "About Us"', () => {
      const title = view.querySelector('h2');
      expect(title?.textContent).toContain('About Us');
    });

    it('should render every app-description', () => {
      const descriptionElements = view.querySelectorAll('app-description');
      expect(descriptionElements.length).toBe(DESCRIPTIONS.length);
    });

    it('should include app-contact components', () => {
      expect(view.querySelector('app-contact')).toBeTruthy();
    });
  });
});
