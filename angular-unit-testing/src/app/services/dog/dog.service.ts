import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogService {
  constructor(private http: HttpClient) { }

  getBreeds(): Observable<string[]> {
    return this.http.get('https://dog.ceo/api/breeds/list/all').pipe(
      map((res: any) => Object.keys(res.message))
    );
  }

  getBreedImages(breed: string, limit: number): Observable<string[]> {
    return this.http
      .get(`https://dog.ceo/api/breed/${breed}/images/random/${limit}`)
      .pipe(map((res: any) => res.message));
  }
}