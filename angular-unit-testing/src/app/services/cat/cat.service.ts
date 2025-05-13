import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface CatFactRequest {
  maxLength: number;
  limit: number;
}

export interface CatFact {
  fact: string;
  length: number;
}

export interface CatBreed {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
}

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) { }

  getFacts(req: CatFactRequest): Observable<CatFact[]> {
    const params = new HttpParams()
      .set('max_length', req.maxLength)
      .set('limit', req.limit);
    return this.http
      .get('https://catfact.ninja/facts', { params })
      .pipe(map((res: any) => res.data));
  }

  getBreeds(limit: number): Observable<CatBreed[]> {
    const params = new HttpParams().set('limit', limit);
    return this.http
      .get('https://catfact.ninja/breeds', { params })
      .pipe(map((res: any) => res.data));
  }
}