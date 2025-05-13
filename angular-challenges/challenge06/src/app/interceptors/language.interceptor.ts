import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // SetHeaders es una propiedad que permite a Angular agregar cabeceras a la petición HTTP
    const options = { setHeaders: { 'Accept-Language': 'en-US' } };

    // También se puede hacer así:
    //const options = { headers: req.headers.set('Accept-Language', 'en-US') };

    const modifiedRequest = req.clone(options);

    return next.handle(modifiedRequest);
  }
}
