import { TokenService } from './../../services/token/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private Router:Router,private TokenService:TokenService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      if(!this.TokenService.isAdmin()){


        this.Router.navigate(['/']);
        return false
      }
    return true;
  }
  
}
