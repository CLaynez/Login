import { Component} from '@angular/core';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  password: string = "";
  email: string = "";
  emailmaxLength: number = 50;
  passwordmaxLength: number = 20;
  minLength: number = 5;

  constructor(private servicio: ServicioService) {}

  validarEmail(): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(this.email);
  }

  async login() {
    if(this.validarEmail()){
      let datos: any = {
        email: this.email,
        password: this.password
      };
      let datosJson: string = JSON.stringify(datos);
      this.servicio.iniciarSesion(datosJson);
    }
  }
}
