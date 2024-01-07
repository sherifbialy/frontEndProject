import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { Observable, map, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
 class AuthGuardClass{
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate():boolean|Observable<boolean>|Promise<boolean> {
   return this.authService.user.pipe(map(user => {
     return !!user;
   }),tap(isAuth=>{
    if(!isAuth){
      this.router.navigate(['/login'])
    }
   
   
   }));
  }

  
  logInGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const isLoginRoute = route.routeConfig!.path === 'login';
  
    return this.authService.user.pipe(
      map(user => {
        if (user && isLoginRoute) {
          return this.router.createUrlTree(['']);
        } else if (!user && !isLoginRoute) {
          return this.router.createUrlTree(['/login']); 
        } else {
          return true;
        }
      })
    );
  }
}
export const AuthGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> |boolean| Promise<boolean> =>{
    return inject(AuthGuardClass).canActivate();
 }

 export const LoginGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean|UrlTree> |boolean| Promise<boolean|UrlTree> |UrlTree=>{
  return inject(AuthGuardClass).logInGuard(route,state);
 }