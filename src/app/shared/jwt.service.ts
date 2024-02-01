import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
    
    getTokenExpiration(token: string): Date | null {
        const helper = new JwtHelperService();
        
        

       return helper.getTokenExpirationDate(token);
   
      }

      isTokenExpired(token:string){
        const helper = new JwtHelperService();
        return helper.isTokenExpired(token); 
      }
}