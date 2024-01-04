import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
 class AuthGuardClass{
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate():boolean {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/login']);
      console.log(false);
      return false;
    }
    console.log(true);
    
    return true;
  }
}
export const AuthGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> |boolean| Promise<boolean> =>{
    return inject(AuthGuardClass).canActivate();
 }