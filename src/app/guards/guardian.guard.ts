import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export const GuardianGuard = () => {

  const router = inject(Router);

  if(localStorage.getItem('jwtToken')){
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
}
