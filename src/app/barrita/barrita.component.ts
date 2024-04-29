import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../services/servicio.service';

@Component({
  selector: 'app-barrita',
  templateUrl: './barrita.component.html',
  styleUrls: ['./barrita.component.css']
})
export class BarritaComponent {
changeLanguage(language: string) {
  this.servicio.switchLanguage(language);
}

  constructor (public router:Router, private servicio: ServicioService){
    
  }
}
