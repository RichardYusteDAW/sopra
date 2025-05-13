import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionComponent } from './description.component';
import { Description } from 'src/app/models/description';

describe('DescriptionComponent', () => {
  let component: DescriptionComponent;
  let fixture: ComponentFixture<DescriptionComponent>;
  let view: HTMLElement;

  const mockDescription: Description = {
    title: 'Test Title',
    imgSrc: 'https://example.com/image.jpg',
    imgAlt: 'Example image',
    text1: 'Paragraph one',
    text2: 'Paragraph two',
    text3: 'Paragraph three',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionComponent],
    });
    fixture = TestBed.createComponent(DescriptionComponent);
    component = fixture.componentInstance;
    component.description = mockDescription;
    fixture.detectChanges();
    view = fixture.nativeElement;
  });

  describe('Testing the component', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Testing the template', () => {
    it('should have a image', () => {
      const img = view.querySelector('img');
      expect(img?.src).toContain(mockDescription.imgSrc);
      expect(img?.alt).toContain(mockDescription.imgAlt);
    });

    it('should have a title', () => {
      const title = view.querySelector('h2');
      expect(title?.textContent).toContain(mockDescription.title);
    });

    it('should have a several paragraphs', () => {
      const paragraphs = view.querySelectorAll('p');
      expect(paragraphs.length).toBe(3);
      expect(paragraphs[0].textContent).toContain(mockDescription.text1);
      expect(paragraphs[1].textContent).toContain(mockDescription.text2);
      expect(paragraphs[2].textContent).toContain(mockDescription.text3);
    });
  });
});
