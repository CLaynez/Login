import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  email: string = "";
  password: string = "";

  constructor() {}

  login() {
    console.log(this.email);
    console.log(this.password);
  }
}
