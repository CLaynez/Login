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
  mensajeDelBackend: string = "";
  emailmaxLength: number = 50;
  passwordmaxLength: number = 20;
  minLength: number = 5;

  constructor(private servicio: ServicioService) {}

  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  async login() {
    if(!this.validarEmail){
      alert("Incorrect E-mail");
    }else if(this.email.length < 5 || this.email.length > 50 || this.password.length < 5 || this.password.length > 20){
      alert("Data input error, please revise your email or password");
    }else{
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
}
