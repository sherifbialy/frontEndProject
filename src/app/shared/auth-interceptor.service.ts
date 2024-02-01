import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:"root",
}    
)
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userData = localStorage.getItem("userData"); 
    let userDataJson:{email:string,_token:string,expirationDate:Date}=userData? JSON.parse(userData):null; 
    if(userDataJson &&userData){
      
     let token=userDataJson._token;
    
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authReq);
    

    }
    else{
        return next.handle(req);

    }
   
    
  }
}