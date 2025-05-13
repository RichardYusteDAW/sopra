import { TestBed } from '@angular/core/testing';
import { provideHttpClient, } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CatFact, CatBreed, CatService } from './cat.service';

describe('CatService', () => {
  let catService: CatService;
  let mockHttpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    catService = TestBed.inject(CatService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(catService).toBeTruthy();
  });

  it('should getFacts with correct request and response', () => {
    // Arrange
    const request = { maxLength: 100, limit: 3 };
    const mockApiResponse = {
      data: [
        { fact: 'Cats are great!', length: 15 },
        { fact: 'Cats love to sleep.', length: 20 },
        { fact: 'Cats can jump high.', length: 20 }
      ]
    };

    let result: CatFact[] | undefined;

    // Act
    catService.getFacts(request).subscribe(facts => result = facts);
    const req = mockHttpClient.expectOne('https://catfact.ninja/facts?max_length=100&limit=3');
    req.flush(mockApiResponse);

    // Assert
    expect(req.request.method).toBe('GET');
    expect(result).toEqual(mockApiResponse.data);
  });

  it('should getBreeds with correct request and response', () => {
    // Arrange
    const limit = 3;
    const mockApiResponse = {
      data: [
        { breed: 'Persian', country: 'Iran', origin: 'natural', coat: 'long', pattern: 'solid' },
        { breed: 'Siamese', country: 'Thailand', origin: 'natural', coat: 'short', pattern: 'colorpoint' },
        { breed: 'Maine Coon', country: 'United States', origin: 'natural', coat: 'long', pattern: 'tabby' }
      ]
    };

    let result: CatBreed[] | undefined;

    // Act
    catService.getBreeds(limit).subscribe(breeds => result = breeds);
    const req = mockHttpClient.expectOne('https://catfact.ninja/breeds?limit=3');
    req.flush(mockApiResponse);

    // Assert
    expect(req.request.method).toBe('GET');
    expect(result).toEqual(mockApiResponse.data);
  });
});