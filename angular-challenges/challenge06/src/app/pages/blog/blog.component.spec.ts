import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let view: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogComponent],
    });
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Testing template', () => {
    it('should have a title', () => {
      const title = view.querySelector('h1');
      expect(title?.textContent).toContain('Este es el componente del bonus 1');
    });
  });
});
