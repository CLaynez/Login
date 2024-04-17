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
  mensajeDelBackend: string = "";
  emailmaxLength: number = 50;
  passwordmaxLength: number = 20;
  minLength: number = 5;

  constructor(private servicio: ServicioService) {}

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
        const response = await this.servicio.iniciarSesion(datosJson).toPromise();
        console.log('Solicitud POST exitosa', response);
        alert('La solicitud se ha enviado con éxito.');
        this.mensajeDelBackend = response.message;
      } catch (error) {
        console.error('Error:', error);
        alert('Se ha producido un error al enviar la solicitud.');
      }
    }
}
