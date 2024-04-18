import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  // Método para guardar el token JWT en el almacenamiento local
  guardarTokenJWT(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Método para obtener el token JWT del almacenamiento local
  obtenerTokenJWT(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Método para eliminar el token JWT del almacenamiento local
  eliminarTokenJWT(): void {
    localStorage.removeItem('jwtToken');
  }
}
