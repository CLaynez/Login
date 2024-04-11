import { Component, } from '@angular/core';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  password: string = "";
  email: string = "";
  data: string[] = [];
  constructor(private servicio: ServicioService) { 
    this.data = servicio.getData();
  }

  login() {
    console.log(this.password);
    console.log(this.email);
    this.servicio.enviarDatos(this.password);
    this.servicio.enviarDatos(this.email);
  }
}
