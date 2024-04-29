import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  urlinicio: string = "http://localhost:8008/loginaso/recibo";
  urlregistro: string = "http://localhost:8008/loginaso/register";
  urlmenu: string = "http://localhost:8008/menu";
  
  constructor(private http: HttpClient, private auth:AuthServiceService) { }

  iniciarSesion(data: any) {
    
    return this.http.post<any>(this.urlinicio, data).subscribe(response => {
      if (response && response.token) {
        this.auth.guardarTokenJWT(response.token);
        this.abrirMenu(this.auth.obtenerTokenJWT());
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

  abrirMenu(token: string | null) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.urlmenu, token).subscribe(response => {
      
    });
  }
}



