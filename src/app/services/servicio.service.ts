import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  urlinicio: string = "http://localhost:8008/recibo";
  urlregistro: string = "http://localhost:8008/new";
  
  constructor(private http: HttpClient) { }

  iniciarSesion(data: any) {
    console.log(data);
    return this.http.post<any>(this.urlinicio, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error de HTTP:', error.status);
          console.error('Mensaje:', error.message);
          return throwError(error);
        })
      );
  }

  registrar(data: any) {
    console.log(data);
    return this.http.post<any>(this.urlregistro, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error de HTTP:', error.status);
          console.error('Mensaje:', error.message);
          return throwError(error);
        })
      );
  }
}
