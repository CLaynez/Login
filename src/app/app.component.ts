import { ServicioService } from './services/servicio.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showAlert = false;
  message = '';

  constructor(private servicio: ServicioService){}

  ngOnInit(){
    this.servicio.alert$
      .subscribe((res: any) =>{
        this.message = res.message;
        this.showAlert = true
        setTimeout(() => {this.showAlert = false}, res.time)
      } );
  }
}
