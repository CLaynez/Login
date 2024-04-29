import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  
  urlinicio: string = "http://localhost:8008/loginaso/recibo";
  urlregistro: string = "http://localhost:8008/loginaso/register";
  
  constructor(private http: HttpClient, private auth:AuthServiceService, private router: Router, private translate: TranslateService) { 
    this.translate.setDefaultLang('en');
  }

  iniciarSesion(data: any) {
    return this.http.post<any>(this.urlinicio, data).subscribe(response => {
      if (response && response.token) {
        this.auth.guardarTokenJWT(response.token);
        this.router.navigate(['/home']);
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

  switchLanguage(language: string){
    this.translate.use(language);
  }
}



