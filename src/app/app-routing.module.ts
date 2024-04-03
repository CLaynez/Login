import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AppComponent } from './app.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "login", component: InicioSesionComponent},
  { path: "register", component: RegistroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
