import { Component} from '@angular/core';
import { ServicioService } from '../services/servicio.service';
import { AuthServiceService } from '../services/auth-service.service';

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

  constructor(private servicio: ServicioService, private auth:AuthServiceService) {}

  validarEmail(): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.login();
    return regex.test(this.email);
  }

  async login() {
      let datos: any = {
        email: this.email,
        password: this.password
      };
      let datosJson: string = JSON.stringify(datos);
      try {
        const response = await this.servicio.iniciarSesion(datosJson);
        alert('La solicitud se ha enviado con éxito.');
      } catch (error) {
        console.error('Error:', error);
        alert('Se ha producido un error al enviar la solicitud.');
      }
    }
}
