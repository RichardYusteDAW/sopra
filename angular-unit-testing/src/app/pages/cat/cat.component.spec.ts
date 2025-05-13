import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CatComponent } from './cat.component';
import { CatBreed, CatFact, CatService } from '../../services/cat/cat.service';

describe('CatComponent', () => {
  let component: CatComponent;
  let fixture: ComponentFixture<CatComponent>;
  let mockCatService: jasmine.SpyObj<CatService>;

  let mockFacts: CatFact[];
  let mockBreeds: CatBreed[];

  beforeEach(async () => {
    mockCatService = jasmine.createSpyObj('CatService', ['getFacts', 'getBreeds']);

    await TestBed.configureTestingModule({
      imports: [CatComponent],
      providers: [{ provide: CatService, useValue: mockCatService }],
    }).compileComponents();

    mockFacts = [
      { fact: 'Cats are great!', length: 15 },
      { fact: 'Cats are awesome!', length: 17 },
      { fact: 'Cats are amazing!', length: 17 }
    ];
    mockBreeds = [
      { breed: 'Siamese', country: 'Thailand', origin: 'Southeast Asia', coat: 'short', pattern: 'pointed' },
      { breed: 'Persian', country: 'Iran', origin: 'Middle East', coat: 'long', pattern: 'solid' }
    ];
    fixture = TestBed.createComponent(CatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getFacts', () => {
    // Arrange
    mockCatService.getFacts.and.returnValue(of(mockFacts));

    // Act
    component.getFacts();

    // Assert
    expect(mockCatService.getFacts).toHaveBeenCalledWith({
      limit: component.factsLimit,
      maxLength: component.factsLength,
    });
    expect(component.facts).toEqual(mockFacts);
  });

  it('should getBreeds', () => {
    // Arrange
    mockCatService.getBreeds.and.returnValue(of(mockBreeds));

    // Act
    component.getBreeds();

    // Assert
    expect(mockCatService.getBreeds).toHaveBeenCalledWith(component.breedsLimit);
    expect(component.breeds).toEqual(mockBreeds);
  });

  it('should render 3 facts with correct texts', () => {
    // Arrange
    component.facts = mockFacts;
    fixture.detectChanges();

    // Act
    const factElements = fixture.nativeElement.querySelectorAll('.fact-content');

    // Assert
    expect(factElements.length).toBe(3);
    expect(factElements[0].textContent).toContain('Cats are great!');
    expect(factElements[1].textContent).toContain('Cats are awesome!');
    expect(factElements[2].textContent).toContain('Cats are amazing!');
  });

  it('should render 4 breed cards', () => {
    // Arrange
    component.breeds = mockBreeds;
    fixture.detectChanges();

    // Act
    const breedCards = fixture.nativeElement.querySelectorAll('app-breed-card');

    // Assert
    expect(breedCards.length).toBe(2);
    expect(breedCards[0].textContent).toContain('Siamese');
    expect(breedCards[0].textContent).toContain('Thailand');
    expect(breedCards[0].textContent).toContain('Southeast Asia');
    expect(breedCards[0].textContent).toContain('short');
    expect(breedCards[0].textContent).toContain('pointed');
  });
});