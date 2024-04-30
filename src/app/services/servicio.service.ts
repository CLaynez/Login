import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private alertSource = new Subject();
  alert$ = this.alertSource.asObservable();
  
  urlinicio: string = "http://localhost:8008/loginaso/recibo";
  urlregistro: string = "http://localhost:8008/loginaso/register";
  
  constructor(private http: HttpClient, private auth:AuthServiceService, private router: Router, private translate: TranslateService) { 
    this.translate.setDefaultLang('en');
  }

  iniciarSesion(data: any) {
    return this.http
    .post<any>(this.urlinicio, data)
    .subscribe(response => {
      if (response && response.token) {
        this.auth.guardarTokenJWT(response.token);
        this.router.navigate(['/home']);
      }else{
        alert('No hay token');
      }
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.status == HttpStatusCode.Forbidden)
      this.showAlert('No tiene permisos para realizar la solicitud.');
    if (error.status == HttpStatusCode.NotFound)
      this.showAlert('No existen los datos.');
    if (error.status == HttpStatusCode.InternalServerError)
      this.showAlert('Error en el servidor.');
    if(error.status == HttpStatusCode.Unauthorized)
      this.showAlert('No está autorizado a realizar la función')
    this.showAlert('Un error inesperado ha ocurrido.');
  }

  registrar(data: any): any {
    console.log(data);
    return this.http.post<any>(this.urlregistro, data)
    .subscribe(response => {
      if (response && response.token) {
        this.auth.guardarTokenJWT(response.token);
      }
    });
  }

  switchLanguage(language: string){
    this.translate.use(language);
  }

  showAlert(text: string, time: number = 5000){
    this.alertSource.next({text, time});
  }
}



