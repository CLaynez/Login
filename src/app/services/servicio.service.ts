import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  url: string = "http://localhost:8000";
  private data: string[] =  [];
  getData(): string[] {
    return this.data;
  }

  constructor(private http: HttpClient) { }

  enviarDatos(data: string) {
    return this.http.post<any>(this.url,data)
  }
}
