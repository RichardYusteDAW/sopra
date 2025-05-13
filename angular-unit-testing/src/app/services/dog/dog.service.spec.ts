import { TestBed } from '@angular/core/testing';
import { provideHttpClient, } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DogService } from './dog.service';

describe('DogService', () => {
  let dogService: DogService;
  let mockHttpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    dogService = TestBed.inject(DogService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(dogService).toBeTruthy();
  });

  it('should getBreeds with correct request and response', () => {
    // Arrange
    const mockApiResponse = {
      message: {
        bulldog: [],
        labrador: [],
        poodle: []
      },
      status: 'success'
    };

    let result: string[] | undefined;

    // Act
    dogService.getBreeds().subscribe(breeds => result = breeds);
    const req = mockHttpClient.expectOne('https://dog.ceo/api/breeds/list/all');
    req.flush(mockApiResponse);

    // Assert
    expect(req.request.method).toBe('GET');
    expect(result).toEqual(['bulldog', 'labrador', 'poodle'])
  });

  it('should getBreedImages with correct request and response', () => {
    // Arrange
    const breed = 'bulldog';
    const limit = 3;
    const mockApiResponse = {
      message: [
        'https://dog.ceo/breeds/bulldog/image1.jpg',
        'https://dog.ceo/breeds/bulldog/image2.jpg',
        'https://dog.ceo/breeds/bulldog/image3.jpg'
      ],
      status: 'success'
    };

    let result: string[] | undefined;

    // Act
    dogService.getBreedImages(breed, limit).subscribe(img => result = img);
    const req = mockHttpClient.expectOne(`https://dog.ceo/api/breed/${breed}/images/random/${limit}`);
    req.flush(mockApiResponse);

    // Assert
    expect(req.request.method).toBe('GET');
    expect(result).toEqual(mockApiResponse.message);
  });
});