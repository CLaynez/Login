import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = localStorage.getItem('jwtToken');

    // Si hay un token JWT, agregarlo al encabezado de autorización de la solicitud
    if (jwtToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`
        }
      });
      return next.handle(authReq);
    } else {
      // Si no hay token JWT, simplemente pasar la solicitud sin modificarla
      return next.handle(req);
    }
  }
}