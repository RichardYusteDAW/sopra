import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedCardComponent } from './breed-card.component';

describe('BreedCardComponent', () => {
  let component: BreedCardComponent;
  let fixture: ComponentFixture<BreedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render info texts', () => {
    // Arrange
    const breed = {
      breed: 'Siamese',
      country: 'Thailand',
      origin: 'Southeast Asia',
      coat: 'short',
      pattern: 'pointed',
    };

    // Act
    component.breed = breed;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Assert
    expect(compiled.textContent).toContain('Siamese');
    expect(compiled.textContent).toContain('Thailand');
    expect(compiled.textContent).toContain('Southeast Asia');
    expect(compiled.textContent).toContain('short');
    expect(compiled.textContent).toContain('pointed');
  });
});