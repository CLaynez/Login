import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url: string = "http://localhost:8008/recibo";
  
  constructor(private http: HttpClient) { }

  enviarDatos(data: any) {
    console.log(data);
    return this.http.post<any>(this.url, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error de HTTP:', error.status);
          console.error('Mensaje:', error.message);
          return throwError(error);
        })
      );
  }
}
