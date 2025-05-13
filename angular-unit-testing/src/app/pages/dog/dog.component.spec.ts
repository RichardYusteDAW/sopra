import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DogComponent } from './dog.component';
import { DogService } from '../../services/dog/dog.service';


describe('DogComponent', () => {
  let component: DogComponent;
  let fixture: ComponentFixture<DogComponent>;
  let mockDogService: jasmine.SpyObj<DogService>;

  let mockBreeds: string[];
  let mockImages: string[];

  beforeEach(async () => {
    mockDogService = jasmine.createSpyObj('DogService', ['getBreeds', 'getBreedImages']);

    await TestBed.configureTestingModule({
      imports: [DogComponent],
      providers: [{ provide: DogService, useValue: mockDogService }],
    }).compileComponents();

    mockBreeds = ['bulldog', 'labrador', 'poodle'];
    mockImages = [
      'https://dog.ceo/api/breed/bulldog/images/random/1',
      'https://dog.ceo/api/breed/labrador/images/random/1',
      'https://dog.ceo/api/breed/poodle/images/random/1'
    ];

    mockDogService.getBreeds.and.returnValue(of(mockBreeds));
    mockDogService.getBreedImages.and.returnValue(of(mockImages));

    fixture = TestBed.createComponent(DogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getBreeds on init', () => {
    // Act
    component.ngOnInit();

    // Assert
    expect(mockDogService.getBreeds).toHaveBeenCalled();
    expect(component.breeds).toEqual(mockBreeds);
  });

  it('should getBreedImages on select changes with value "test"', () => {
    // Arrange
    const event = {
      target: { value: 'otherBreed' }
    } as any as Event;

    mockDogService.getBreedImages.and.returnValue(of(mockImages));

    // Act
    component.onChange(event);

    // Assert
    expect(mockDogService.getBreedImages).toHaveBeenCalledWith('otherBreed', 10);
    expect(component.images).toEqual(mockImages);
  });

  it('should render 3 images', () => {
    // Arrange
    component.images = mockImages;

    fixture.detectChanges();

    const images = fixture.nativeElement.querySelectorAll('img');

    // Act
    fixture.detectChanges();

    // Assert
    expect(images.length).toBe(3);
    expect(images[0].src).toBe(mockImages[0]);
    expect(images[1].src).toBe(mockImages[1]);
    expect(images[2].src).toBe(mockImages[2]);
  });
});