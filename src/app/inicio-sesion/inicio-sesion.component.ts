import { Component, } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  password: string = "";
  email: string = "";
  constructor() { }

  login() {
    console.log(this.password);
    console.log(this.email);
  }
}
