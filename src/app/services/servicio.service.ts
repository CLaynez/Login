import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  urlinicio: string = "http://localhost:8008/loginaso/recibo";
  urlregistro: string = "http://localhost:8008/loginaso/register";
  
  constructor(private http: HttpClient, private auth:AuthServiceService) { }

  iniciarSesion(data: any) {
    console.log(data);
    return this.http.post<any>(this.urlinicio, data).subscribe(response => {
      if (response && response.token) {
        this.auth.guardarTokenJWT(response.token);
        console.log(this.auth.obtenerTokenJWT);
      }else{
        alert('No hay token');
      }
    });
  }

  registrar(data: any) {
    console.log(data);
    return this.http.post<any>(this.urlregistro, data).subscribe(response => {
      if (response && response.token) {
        this.auth.guardarTokenJWT(response.token);
      }
    });
  }
}
