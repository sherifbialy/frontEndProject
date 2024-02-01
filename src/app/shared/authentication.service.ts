import { Injectable, OnInit } from "@angular/core";
import { User } from "../authentication/user.model";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { JwtService } from "./jwt.service";



// export interface AuthResponseData{
//   idToken:string,
//   email:string
//   refreshToken:string
//   expiresIn:string
//   localId:string,
//   registered?:boolean
// }

@Injectable({
    providedIn:'root'
})
export class AuthenticationService implements OnInit{
    
    user=new BehaviorSubject<User|null>(null);
    
   
    private expirationTimer:any;
    constructor(private router:Router, private http:HttpClient,private jwtService:JwtService){

    }
    
    ngOnInit(): void {
      
    }
    
      signUp(email:string,password:string,token:string){
       
       
       return this.http.post<{token:string}>(`${environment.signUpUrl}`,
        {
          email:email,
          password:password,
          returnSecureToken:true
        },
        {
          headers:{
            "recaptcha":token
    
        }
      }).pipe(
          catchError(this.handleError),
          tap(resData => {
            console.log(resData);
            this.handleAuthentication(
              email,

              resData.token,
              this.jwtService.getTokenExpiration(resData.token)!,
              
            );
          })
        );

      }
login(email:string,password:string,token:string){
  return this.http.post<{token:string}>(`${environment.signInUrl}`,
    {
      email:email,
      password:password,
      // returnSecureToken:true
    },
    {
      headers:{
        "recaptcha":token

    }
  }).pipe(catchError(this.handleError),
    tap(resData => {
      console.log(this.jwtService.getTokenExpiration(resData.token));
      this.handleAuthentication(
        email,
        
        resData.token,
        this.jwtService.getTokenExpiration(resData.token)!,
      );
    }))
}
      autoLogin(){
        const userData=localStorage.getItem('userData');
        if(!userData){
          return
        }
        else{
          const userDataJSON:{
             email:string,
       
      _token:string,
      _tokenExpire:Date,
          }=JSON.parse(localStorage.getItem('userData')!);
          let user=new User(userDataJSON.email,userDataJSON._token,new Date(userDataJSON._tokenExpire))
          if(user.token){
            this.user.next(user);
            const expirationDuration=new Date(userDataJSON._tokenExpire).getTime()-new Date().getTime()
            this.autoLogout(expirationDuration)
          }
        }

             


      }
      autoLogout(expirationDuration:number){
        this.expirationTimer=setTimeout(()=>{
          this.logout()
        },expirationDuration)

      }
      logout(){
        
        this.user.next(null);
        this.router.navigate(['/login']);
        if(this.expirationTimer){
         clearTimeout(this.expirationTimer);
        }
        localStorage.removeItem('userData')
      }
      
      
      
      
      private handleAuthentication(
        email: string,
        token: string,
        expiresIn: Date
      ) {
        //const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, token, expiresIn);
        this.user.next(user);
        this.autoLogout(expiresIn.getTime()-new Date().getTime())
        localStorage.setItem('userData',JSON.stringify(user))
      }
    


      private handleError(errorRes: HttpErrorResponse) {
        console.log(errorRes);
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          console.log('error')
          return throwError(()=>new Error(errorMessage));
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
        }
        console.log('error1')
        return throwError(()=>new Error(errorMessage));
      }
}