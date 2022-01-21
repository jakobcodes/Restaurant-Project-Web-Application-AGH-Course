import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  isCustomer:boolean = false;

  constructor(private authService: AuthenticationService){
    this.authService.userData?.subscribe(res => {
        if(res && res.roles.customer){
          this.isCustomer = true
        } else this.isCustomer = false
      })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.isCustomer)
    return this.isCustomer
  }
  
}
