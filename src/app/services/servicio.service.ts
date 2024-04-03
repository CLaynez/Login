import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  enviarDatos() {
    const datos = {};
    this.http.post('https', datos)
      .subscribe(response => {
        console.log('Datos enviados con éxito', response);
      });
  }
}
