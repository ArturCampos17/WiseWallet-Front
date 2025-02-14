import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clona a requisição e adiciona a opção `withCredentials: true`
    const authReq = req.clone({
      withCredentials: true, // Inclui cookies nas requisições
    });

    // Passa a requisição clonada para o próximo handler
    return next.handle(authReq);
  }
}