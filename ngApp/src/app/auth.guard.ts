import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
  constructor(private _authService: AuthService,private _router:Router){}
  
  canActivate(): boolean{
    if(this._authService.loggedIn()){
      return true
    }else{
      this._router.navigate(['/login'])
      return false
    }
  }
}
