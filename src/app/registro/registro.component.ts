import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor() {}

  register() {
    console.log(this.email);
    console.log(this.password);
  }

}
