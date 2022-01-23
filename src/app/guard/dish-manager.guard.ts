import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DishManagerGuard implements CanActivate {

  constructor(private authService: AuthenticationService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.userData == undefined) return false;
    return this.authService.userData!.pipe(map(user => {
      if(user){
        if(user.roles.admin) return true
        if(user.roles.manager) return true
      }
      return false
      }
    ));
  }
  
}
