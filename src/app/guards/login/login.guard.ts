import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private Router:Router,private TokenService:TokenService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.TokenService.isLogged()) {
        if(this.TokenService.isAdmin()){
           this.Router.navigate([`dashboard`]);
           return false
        }
      
          

    }
    return true;
  }
  
}
