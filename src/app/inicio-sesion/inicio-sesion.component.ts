import { Component } from '@angular/core';
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
    return regex.test(this.email);

    this.login();
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
        // Mostrar mensaje de éxito al usuario
        alert('La solicitud se ha enviado con éxito.');
        this.mensajeDelBackend = response.message; // Actualizar mensaje del backend en el componente
      } catch (error) {
        // Mostrar mensaje de error al usuario
        console.error('Error:', error);
        alert('Se ha producido un error al enviar la solicitud.');
      }
    }
}
