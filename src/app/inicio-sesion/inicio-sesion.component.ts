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

  constructor(private servicio: ServicioService) { 
    
  }

  async login() {
    let datos: any = {
      email: this.email,
      password: this.password
    };
    let datosJson: string = JSON.stringify(datos);
    try {
      const response = await this.servicio.enviarDatos(datosJson).toPromise();
      console.log('Solicitud POST exitosa', response);
      // Mostrar mensaje de éxito al usuario
      alert('La solicitud se ha enviado con éxito.');
      this.mensajeDelBackend = response.message; // Actualizar mensaje del backend en el componente
    } catch (error) {
      console.error('Error:', error);
      // Mostrar mensaje de error al usuario
      alert('Se ha producido un error al enviar la solicitud.');
    }
  }
}
